import { JobApplicationForm } from '@/components/job-application-form';
import { OpenPositions } from '@/components/open-positions';

export const metadata = {
  title: 'Job Application',
  description: 'Apply for open positions at our company',
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0b0b0c] font-kumbh pt-20 md:pt-24">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 text-center pt-12 mb-12 md:mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
          Join Our <span className="text-[#EF8030]">Creative Team</span>
        </h1>
        <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
          We're looking for passionate individuals who want to build the future of digital experiences. Explore our open positions and start your journey with us.
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-3 order-2 lg:order-1">
            <JobApplicationForm />
          </div>

          <div className="lg:col-span-2 order-1 lg:order-2">
            <OpenPositions />
          </div>
        </div>
      </div>
    </main>
  );
}
