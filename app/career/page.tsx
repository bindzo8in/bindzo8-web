import { JobApplicationForm } from '@/components/job-application-form';
import { OpenPositions } from '@/components/open-positions';

export const metadata = {
  title: 'Job Application',
  description: 'Apply for open positions at our company',
};

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50 font-kumbh">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <JobApplicationForm />
            </div>
          </div>

          {/* Open Positions Section */}
          <div className="lg:col-span-1">
            <OpenPositions />
          </div>
        </div>
      </div>
    </main>
  );
}
