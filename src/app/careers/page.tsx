import { PremiumPageLayout } from "@/components/PremiumPageLayout";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const jobs = [
  { title: "Senior Hardware Engineer", dept: "Hardware", loc: "San Francisco, CA" },
  { title: "Lead Product Designer", dept: "Design", loc: "New York, NY" },
  { title: "Supply Chain Manager", dept: "Operations", loc: "Remote" },
  { title: "Frontend Software Engineer", dept: "Engineering", loc: "San Francisco, CA" },
];

export default function CareersPage() {
  return (
    <PremiumPageLayout 
      title="Careers" 
      subtitle="Join a team of obsessive engineers and designers on a mission to redefine the air we breathe."
    >
      <div className="mt-12 max-w-4xl">
        <h2 className="text-2xl font-medium text-brand-graphite mb-8 pb-4 border-b border-black/10">Open Roles</h2>
        <div className="flex flex-col">
          {jobs.map((job, i) => (
            <Link 
              key={i} 
              href="#"
              className="group flex flex-col md:flex-row md:items-center justify-between py-8 border-b border-black/5 hover:bg-white/50 transition-colors -mx-6 px-6 rounded-2xl"
            >
              <div className="flex flex-col gap-2 mb-4 md:mb-0">
                <h3 className="text-2xl font-medium text-brand-graphite group-hover:text-brand-teal transition-colors">{job.title}</h3>
                <div className="flex items-center gap-4 text-brand-graphite/60 text-sm tracking-wide">
                  <span>{job.dept}</span>
                  <span className="w-1 h-1 rounded-full bg-black/20" />
                  <span>{job.loc}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-brand-teal font-medium">
                Apply Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </PremiumPageLayout>
  );
}
