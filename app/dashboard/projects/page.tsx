"use client";

import { useProjects, useDeleteProject } from "@/lib/hooks/use-projects";
import { useState, useMemo } from "react";
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
import { MoreHorizontal, Edit, Trash, Plus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ProjectStatus, MediaType } from "@/app/generated/prisma/client";

export default function AdminProjectsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | "ALL">("ALL");

  const queryParams = useMemo(() => ({
    search: search || undefined,
    status: statusFilter !== "ALL" ? statusFilter : undefined,
    take: 10
  }), [search, statusFilter]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useProjects(queryParams);

  const deleteMutation = useDeleteProject();

  const projects = useMemo(() => data?.pages.flatMap(p => p.data) || [], [data]);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this project? This will also delete media from Cloudinary.")) {
      deleteMutation.mutate(id);
    }
  };

  const columns = useMemo(() => [
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
    data: projects,
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
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
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
