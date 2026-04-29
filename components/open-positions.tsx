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
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Opening Positions:</h2>
      <div className="space-y-3">
        {openPositions.map((position, index) => (
          <Card key={index} className="p-4 bg-gray-100">
            <h3 className="font-semibold text-gray-900">{position.title}</h3>
            <p className="text-sm text-gray-600 mt-2">{position.description}</p>
            <div className="flex items-center gap-2 mt-3">
              <Badge variant="secondary" className="bg-gray-200 text-gray-700">
                {position.salary}
              </Badge>
              <span className="text-xs text-red-600 font-semibold">{position.status}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
