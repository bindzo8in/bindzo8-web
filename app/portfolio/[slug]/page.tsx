import { getProjectBySlug, getRelatedProjects } from "@/lib/repositories/project";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Not Found" };

  return {
    title: `${project.title} | Portfolio`,
    description: project.shortDescription || `Case study for ${project.title}`,
    openGraph: {
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
    <article className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Section */}
      <div className="w-full h-[60vh] relative bg-black">
        {project.featuredMediaUrl ? (
          project.featuredMediaUrl.match(/\.(mp4|webm)$/i) ? (
            <video src={project.featuredMediaUrl} className="w-full h-full object-cover opacity-70" autoPlay loop muted />
          ) : (
            <Image src={project.featuredMediaUrl} alt={project.title} fill className="object-cover opacity-70" priority />
          )
        ) : null}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-6">
          <h1 className="text-5xl font-bold mb-4">{project.title}</h1>
          <p className="text-xl max-w-2xl text-gray-200">{project.shortDescription}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-10 relative z-10">
        <div className="bg-white rounded-xl shadow-lg p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            {project.overview && (
              <section>
                <h2 className="text-2xl font-semibold mb-3">Overview</h2>
                <div className="prose text-gray-600 whitespace-pre-wrap">{project.overview}</div>
              </section>
            )}
            {project.challenge && (
              <section>
                <h2 className="text-2xl font-semibold mb-3">The Challenge</h2>
                <div className="prose text-gray-600 whitespace-pre-wrap">{project.challenge}</div>
              </section>
            )}
            {project.solution && (
              <section>
                <h2 className="text-2xl font-semibold mb-3">Our Solution</h2>
                <div className="prose text-gray-600 whitespace-pre-wrap">{project.solution}</div>
              </section>
            )}
            {project.results && (
              <section>
                <h2 className="text-2xl font-semibold mb-3">Results</h2>
                <div className="prose text-gray-600 whitespace-pre-wrap">{project.results}</div>
              </section>
            )}
          </div>
          
          <div className="space-y-6 bg-gray-50 p-6 rounded-lg h-fit border border-gray-100">
            {project.clientName && (
              <div>
                <h3 className="font-semibold text-gray-900">Client</h3>
                <p className="text-gray-600">{project.clientName}</p>
              </div>
            )}
            {project.service && (
              <div>
                <h3 className="font-semibold text-gray-900">Service</h3>
                <p className="text-gray-600">{project.service.name}</p>
              </div>
            )}
            {project.projectUrl && (
              <div>
                <h3 className="font-semibold text-gray-900">Website</h3>
                <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Visit Project ↗
                </a>
              </div>
            )}
            {project.technologies.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Technologies</h3>
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
            <h2 className="text-3xl font-bold mb-8">Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {videos.map(v => (
                <div key={v.id} className="w-full aspect-video rounded-xl overflow-hidden bg-black">
                  <video src={v.url} controls className="w-full h-full" />
                </div>
              ))}
              {images.map(img => (
                <div key={img.id} className="relative w-full aspect-video rounded-xl overflow-hidden group border border-gray-200">
                  <Image src={img.url} alt={img.alt || project.title} fill className="object-cover transition-transform group-hover:scale-105" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Documents */}
        {documents.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8">Documents</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {documents.map(doc => (
                <a 
                  key={doc.id} 
                  href={doc.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center p-4 border rounded-lg bg-white hover:bg-gray-50 transition border-gray-200 shadow-sm"
                >
                  <div className="w-10 h-10 bg-red-100 text-red-600 rounded flex items-center justify-center font-bold mr-4">
                    PDF
                  </div>
                  <span className="font-medium truncate">{doc.fileName || 'Document'}</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <div className="mt-20">
            <h2 className="text-3xl font-bold mb-8">Related Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map(rp => (
                <Link key={rp.id} href={`/portfolio/${rp.slug}`} className="group block">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 border border-gray-200">
                    {rp.featuredMediaUrl ? (
                      <Image src={rp.featuredMediaUrl} alt={rp.title} fill className="object-cover transition-transform group-hover:scale-105" />
                    ) : (
                      <div className="w-full h-full bg-gray-200" />
                    )}
                  </div>
                  <h3 className="text-xl font-bold group-hover:text-blue-600 transition">{rp.title}</h3>
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
