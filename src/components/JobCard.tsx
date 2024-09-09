import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Heart, MapPinIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { savedJobs } from "@/api/jobs-api";
import useFetch from "@/hooks/useFetch";

export interface JobCardProps {
    job:any;
    isMyJob : boolean
    savedInitially : boolean
    onSavingJob : () => void
}

const JobCard : React.FC<JobCardProps>= ({job,isMyJob=false,savedInitially=false, onSavingJob}) => {

  const {user} = useUser()
  const [saved,setSaved] = useState(savedInitially)
  const { data:savedJobsData, fetch:savedJobsFunc , loading:loadingSavedJobs} = useFetch(savedJobs,{alreadySaved:saved});

  const handleSavedJobs = async () => {
        await savedJobsFunc({
            user_id :user?.id,
            job_id : job.id
        });
        setSaved(!saved);
        onSavingJob();
  }

  useEffect(()=>{
    if(savedJobsData && savedJobsData!==undefined){
        setSaved(savedJobsData.length > 0)
    }
  },[savedJobsData])

  return (
    <div>
        <Card>
            <CardHeader>
                <CardTitle className="flex justify-between font-bold">
                    {job.title}
                    {isMyJob && (<Trash2Icon fill="red" className="text-red-300 cursor-pointer" size={18}/>)}
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 flex-1">
                <div className="flex justify-between ">
                    {job.company && (<img src={job.company.logo_url} className="h-6"/>)}
                   <div className="flex items-center gap-2">
                   <MapPinIcon size={15}/> {job.location}
                   </div>
                </div>
                <hr/>
                {job.description.substring(0,job.description.indexOf("."))}
            </CardContent>
            <CardFooter className="flex gap-2">
                <Link to={`/job/${job.id}`} className="flex-1">
                    <Button variant={'secondary'} className="w-full">
                        More Details
                    </Button>
                </Link>

                {!isMyJob && (
                    <Button
                    variant={"outline"}
                    className="w-15"
                    onClick={handleSavedJobs}
                    disabled={loadingSavedJobs ?? false}
                    >
                    {saved ? (
                        <Heart size={20} stroke="red" fill="red"/>
                    ):(
                        <Heart size={20}/>
                    )}
                    </Button>
                )}
            </CardFooter>
        </Card>
    </div>
  )
}

export default JobCard
