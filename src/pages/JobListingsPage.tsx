import { useEffect, useState } from "react";
import { getCompanies } from "@/api/companies-api";
import { getJobs } from "@/api/jobs-api";
import JobCard from "@/components/JobCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useFetch from "@/hooks/useFetch";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { State } from "country-state-city";

const JobListingsPage = () => {
  const { isLoaded } = useUser();
  const [location, setLocation] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [companyId, setCompanyId] = useState("");

  const {
    data: jobsData,
    fetch: fetchJobs,
    loading: loadingJobs,
  } = useFetch(getJobs, { location, searchQuery, companyId });

  const {
    data: companiesData,
    fetch: fetchCompanies,
    loading: loadingCompanies,
  } = useFetch(getCompanies);

  useEffect(() => {
    if (isLoaded) fetchCompanies();
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded) fetchJobs();
  }, [isLoaded, location, searchQuery, companyId]);

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    let formData = new FormData(e.target);

    const query: any = formData.get("search-query");
    if (query) setSearchQuery(query);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setCompanyId("");
    setLocation("");
  };

  return (
    <div>
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl pb-8 text-center">
        Latest Jobs
      </h1>

      {/* {Add filters here} */}
      <form
        onSubmit={handleSubmit}
        className="h-14 w-full flex-col items-center mb-3 gap-3"
      >
        <div className="flex gap-3 h-14">
          <Input
            type="text"
            placeholder="Search Jobs by title..."
            name="search-query"
            className="h-full text-md flex-1 px-4"
          />
          <Button variant={"blue"} className="h-full sm:w-28" type="submit">
            Search
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full mt-6">
          <Select
            value={location}
            onValueChange={(value) => {
              setLocation(value);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by Location" />
            </SelectTrigger>
            <SelectContent>
              {State.getStatesOfCountry("IN").map(({ name }) => (
                <SelectItem key={name} value={name}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={companyId}
            onValueChange={(value) => {
              setCompanyId(value);
            }}
          >
            <SelectTrigger>
            <SelectValue
                placeholder={companyId ? companiesData?.find(company => company.id === companyId)?.name : "Filter by Company"}
              />
            </SelectTrigger>
            <SelectContent>
              {companiesData?.map(({ name, id }) => (
                <SelectItem key={name} value={id}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            className="sm:w-1/2"
            variant="destructive"
            onClick={clearFilters}
          >
            Clear Filters
          </Button>
        </div>
      </form>

      {loadingJobs && (
        <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
      )}

      {loadingJobs === false && (
        <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobsData?.length ? (
            jobsData.map((job) => {
              return (
                <JobCard
                  key={job.id}
                  job={job}
                  savedInitially={job.saved.length > 0}
                  onSavingJob={() => {}}
                />
              );
            })
          ) : (
            <div> No Jobs Found 😢</div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobListingsPage;
