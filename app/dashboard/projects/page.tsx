"use client";

import { useProjects, useDeleteProject, useUpdateProjectSortOrder } from "@/lib/hooks/use-projects";
import { useState, useMemo, useEffect } from "react";
import { 
  flexRender, 
  getCoreRowModel, 
  useReactTable 
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit, Trash, Plus, GripVertical } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ProjectStatus } from "@/app/generated/prisma/client";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortableRow({ row, flexRender }: { row: any, flexRender: any }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: row.original.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    ...(isDragging ? { position: "relative" as any, zIndex: 50, backgroundColor: "rgba(255, 255, 255, 0.9)" } : {})
  };

  return (
    <TableRow ref={setNodeRef} style={style}>
      {row.getVisibleCells().map((cell: any) => {
        if (cell.column.id === 'drag-handle') {
          return (
            <TableCell key={cell.id} className="w-12">
              <div {...attributes} {...listeners} className="cursor-grab p-2 hover:bg-gray-100 rounded inline-block">
                <GripVertical className="h-4 w-4 text-gray-500" />
              </div>
            </TableCell>
          );
        }
        return (
          <TableCell key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        );
      })}
    </TableRow>
  );
}

export default function AdminProjectsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | "ALL">("ALL");
  const [localProjects, setLocalProjects] = useState<any[]>([]);

  const queryParams = useMemo(() => ({
    search: search || undefined,
    status: statusFilter !== "ALL" ? statusFilter : undefined,
    take: 10
  }), [search, statusFilter]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useProjects(queryParams);
  const deleteMutation = useDeleteProject();
  const updateSortOrderMutation = useUpdateProjectSortOrder();

  const projects = useMemo(() => data?.pages.flatMap(p => p.data) || [], [data]);

  useEffect(() => {
    setLocalProjects(projects);
  }, [projects]);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this project? This will also delete media from Cloudinary.")) {
      deleteMutation.mutate(id);
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = localProjects.findIndex((p) => p.id === active.id);
    const newIndex = localProjects.findIndex((p) => p.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      const newItems = arrayMove(localProjects, oldIndex, newIndex);
      
      const updates = newItems.map((item, index) => ({
        id: item.id,
        sortOrder: newItems.length - index,
      }));

      setLocalProjects(newItems);
      updateSortOrderMutation.mutate(updates);
    }
  };

  const columns = useMemo(() => [
    {
      id: "drag-handle",
      header: "",
      cell: () => null, // Handled in SortableRow
    },
    {
      accessorKey: "featuredMediaUrl",
      header: "Media",
      cell: ({ row }: any) => {
        const url = row.getValue("featuredMediaUrl");
        if (!url) return <div className="w-12 h-12 bg-gray-200 rounded"></div>;
        return (
          <div className="relative w-12 h-12 rounded overflow-hidden">
            {url.match(/\.(mp4|webm)$/i) ? (
              <video src={url} className="w-full h-full object-cover" muted />
            ) : (
              <Image src={url} alt="Media" fill className="object-cover" />
            )}
          </div>
        );
      }
    },
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "clientName",
      header: "Client",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: any) => {
        const status = row.getValue("status");
        return (
          <Badge variant={status === "PUBLISHED" ? "default" : "secondary"}>
            {status}
          </Badge>
        );
      }
    },
    {
      accessorKey: "isFeatured",
      header: "Featured",
      cell: ({ row }: any) => {
        return row.getValue("isFeatured") ? <Badge variant="secondary">Featured</Badge> : null;
      }
    },
    {
      id: "actions",
      cell: ({ row }: any) => {
        const project = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/projects/${project.id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDelete(project.id)} className="text-red-600">
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ], []);

  const table = useReactTable({
    data: localProjects,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Projects</h1>
        <Button asChild>
          <Link href="/dashboard/projects/create">
            <Plus className="mr-2 h-4 w-4" /> New Project
          </Link>
        </Button>
      </div>

      <div className="flex gap-4 items-center">
        <Input 
          placeholder="Search by title or client..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <select 
          className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
        >
          <option value="ALL">All Status</option>
          <option value="PUBLISHED">Published</option>
          <option value="DRAFT">Draft</option>
        </select>
      </div>

      <div className="rounded-md border bg-white">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : table.getRowModel().rows?.length ? (
                <SortableContext
                  items={localProjects.map(p => p.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {table.getRowModel().rows.map((row) => (
                    <SortableRow key={row.id} row={row} flexRender={flexRender} />
                  ))}
                </SortableContext>
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </DndContext>
      </div>
      
      {hasNextPage && (
        <div className="flex justify-center mt-4">
          <Button 
            variant="outline" 
            onClick={() => fetchNextPage()} 
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? "Loading more..." : "Load More"}
          </Button>
        </div>
      )}
    </div>
  );
}
