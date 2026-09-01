import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

const openPositions = [
  {
    title: 'UI & UX Designer',
    description: "We're seeking a talented junior UI/UX Designer to be a part of our creative team.",
    salary: 'Full-time',
    status: 'Not Disclosed',
  },
  {
    title: 'Web Developer',
    description: "We're seeking a talented junior UI/UX Designer to be a part of our creative team.",
    salary: 'Full-time',
    status: 'Not Disclosed',
  },
  {
    title: 'Mobile App Developer - iOS',
    description: "We're seeking a talented junior UI/UX Designer to be a part of our creative team.",
    salary: 'Full-time',
    status: 'Not Disclosed',
  },
  {
    title: 'Digital Marketing',
    description: "We're seeking a talented junior UI/UX Designer to be a part of our creative team.",
    salary: 'Full-time',
    status: 'Not Disclosed',
  },
  {
    title: 'React',
    description: "We're seeking a talented junior UI/UX Designer to be a part of our creative team.",
    salary: 'Full-time',
    status: 'Not Disclosed',
  },
  {
    title: 'Graphic',
    description: "We're seeking a talented junior UI/UX Designer to be a part of our creative team.",
    salary: 'Full-time',
    status: 'Not Disclosed',
  },
];

export function OpenPositions() {
  return (
    <div className="lg:sticky lg:top-24">
      <h2 className="text-2xl font-bold mb-4 text-white">Opening Positions</h2>

      {/* <p className="text-sm text-gray-600 mb-4">
        We're looking for creative and passionate professionals to join our team.
        Explore the available roles below and apply for the position that best
        matches your skills and experience.
      </p> */}

      <div className="space-y-3 max-h-[50vh] lg:max-h-[calc(100vh-220px)] overflow-y-auto pr-2">
        {openPositions.map((position, index) => (
          <Card
            key={index}
            className="px-4 py-3 bg-[#151515] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-3"
          >
           <h3 className="text-sm font-medium text-white flex-1 whitespace-nowrap overflow-hidden text-ellipsis">
  {position.title}
</h3>

            <Badge
              variant="secondary"
              className="bg-white/10 text-white/70 whitespace-nowrap hover:bg-white/20"
            >
              {position.salary}
            </Badge>

            <span className="text-xs text-[#EF8030] font-semibold whitespace-nowrap">
              {position.status}
            </span>
          </Card>
        ))}
      </div>
    </div>
  );
}
