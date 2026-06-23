import { getProjectBySlug, getRelatedProjects } from "@/lib/repositories/project";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import JsonLd from "@/components/seo/JsonLd";
import { getArticleSchema } from "@/components/seo/Schemas";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Not Found" };

  return {
    title: `${project.title} | Bindzo 8 Portfolio`,
    description: project.shortDescription || `Case study for ${project.title}`,
    alternates: {
      canonical: `/portfolio/${slug}`,
    },
    openGraph: {
      title: project.title,
      description: project.shortDescription || `Case study for ${project.title}`,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/portfolio/${slug}`,
      type: "article",
      images: project.featuredMediaUrl ? [
        {
          url: project.featuredMediaUrl,
          width: 1200,
          height: 630,
          alt: project.title,
        }
      ] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.shortDescription || `Case study for ${project.title}`,
      images: project.featuredMediaUrl ? [project.featuredMediaUrl] : [],
    },
  };
}

export default async function PortfolioDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project || project.status !== "PUBLISHED") {
    return notFound();
  }

  const relatedProjects = await getRelatedProjects(project.id, project.serviceId, 3);

  const images = project.media.filter(m => m.type === "IMAGE");
  const videos = project.media.filter(m => m.type === "VIDEO");
  const documents = project.media.filter(m => m.type === "DOCUMENT");

  return (
    <article className="min-h-screen bg-[#FFF5F4] pb-20 font-kumbh">
      <JsonLd data={getArticleSchema(
        project.title,
        project.shortDescription || "",
        project.featuredMediaUrl || undefined,
        project.createdAt.toISOString()
      )} />
      {/* Hero Section */}
      <div className="w-full h-[60vh] relative bg-black">
        {project.featuredMediaUrl ? (
          project.featuredMediaUrl.match(/\.(mp4|webm)$/i) ? (
            <video src={project.featuredMediaUrl} className="w-full h-full object-cover opacity-70" autoPlay loop muted />
          ) : (
            <Image src={project.featuredMediaUrl} alt={project.title} fill className="object-cover opacity-40" priority />
          )
        ) : null}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-6">
          <h1 className="text-5xl font-bold mb-4">{project.title}</h1>
          <p className="text-xl max-w-2xl text-gray-200">{project.shortDescription}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-10 relative z-10">
        <div className="bg-white rounded-xl shadow-lg border border-red-50 p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            {project.overview && (
              <section>
                <h2 className="text-2xl font-semibold text-red-700 mb-3">Overview</h2>
                <div className="prose text-gray-600 whitespace-pre-wrap">{project.overview}</div>
              </section>
            )}
            {project.challenge && (
              <section>
                <h2 className="text-2xl font-semibold text-red-700 mb-3">The Challenge</h2>
                <div className="prose text-gray-600 whitespace-pre-wrap">{project.challenge}</div>
              </section>
            )}
            {project.solution && (
              <section>
                <h2 className="text-2xl font-semibold text-red-700 mb-3">Our Solution</h2>
                <div className="prose text-gray-600 whitespace-pre-wrap">{project.solution}</div>
              </section>
            )}
            {project.results && (
              <section>
                <h2 className="text-2xl font-semibold text-red-700 mb-3">Results</h2>
                <div className="prose text-gray-600 whitespace-pre-wrap">{project.results}</div>
              </section>
            )}
          </div>

          <div className="space-y-6 bg-[#FFF5F4] p-6 rounded-lg h-fit border border-red-100">
            {project.clientName && (
              <div>
                <h3 className="font-semibold text-red-700">Client</h3>
                <p className="text-gray-600">{project.clientName}</p>
              </div>
            )}
            {project.service && (
              <div>
                <h3 className="font-semibold text-red-700">Service</h3>
                <p className="text-gray-600">{project.service.name}</p>
              </div>
            )}
            {project.projectUrl && (
              <div>
                <h3 className="font-semibold text-red-700">Website</h3>
                <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Visit Project ↗
                </a>
              </div>
            )}
            {project.tags.length > 0 && (
              <div>
                <h3 className="font-semibold text-red-700 mb-2">Categories / Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, idx) => (
                    <Badge key={idx} variant="outline" className="border-red-200 text-gray-700 bg-white hover:bg-red-50">{tag}</Badge>
                  ))}
                </div>
              </div>
            )}
            {project.technologies.length > 0 && (
              <div>
                <h3 className="font-semibold text-red-700 mb-2">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map(t => (
                    <Badge key={t.id} variant="secondary">{t.name}</Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Gallery */}
        {(images.length > 0 || videos.length > 0) && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-red-700 mb-8">Gallery</h2>
            <div className="columns-1 md:columns-2 gap-6 space-y-6">
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="mb-6 break-inside-avoid overflow-hidden rounded-xl bg-black"
                >
                  <video
                    src={video.url}
                    controls
                    className="w-full h-auto"
                  />
                </div>
              ))}

              {images.map((image) => (
                <div
                  key={image.id}
                  className="mb-6 break-inside-avoid overflow-hidden rounded-xl border border-red-100 group"
                >
                  <Image
                    src={image.url}
                    alt={image.alt || project.title}
                    width={1200}
                    height={1200}
                    className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Documents */}
        {documents.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-red-700 mb-8">Documents</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {documents.map(doc => (
                <a
                  key={doc.id}
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 border rounded-lg bg-white hover:bg-[#FFF5F4] transition border-red-100 shadow-sm"
                >
                  <div className="w-10 h-10 bg-red-100 text-red-600 rounded flex items-center justify-center font-bold mr-4">
                    PDF
                  </div>
                  <span className="font-medium text-red-700 truncate">{doc.fileName || 'Document'}</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-red-700 mb-8">Related Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map(rp => (
                <Link key={rp.id} href={`/portfolio/${rp.slug}`} className="group block">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 border border-red-100">
                    {rp.featuredMediaUrl ? (
                      <Image src={rp.featuredMediaUrl} alt={rp.title} fill className="object-cover transition-transform group-hover:scale-105" />
                    ) : (
                      <div className="w-full h-full bg-red-50" />
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-red-700 group-hover:text-red-600 transition">{rp.title}</h3>
                  {rp.service && <p className="text-gray-500 text-sm mt-1">{rp.service.name}</p>}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
