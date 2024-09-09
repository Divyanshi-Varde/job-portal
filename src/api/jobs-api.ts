import supabaseClient from "@/utils/supabase";

export interface JobsProps {
  location: string;
  company_id: string;
  searchQuery: any;
}

export async function getJobs(
  token: any,
  { location, company_id, searchQuery }: JobsProps
): Promise<any> {
  const supabase = await supabaseClient(token);

  let query = supabase
    .from("jobs")
    .select("*, company:companies(name,logo_url), saved:saved_jobs(id)");

  if (location) {
    query = query.eq("location", location);
  }

  if (company_id) {
    query = query.eq("company_id", company_id);
  }

  if (searchQuery) {
    query = query.ilike("title", `%${searchQuery}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching jobs:", error);
    return null;
  }

  return data;
}

export async function savedJobs(
  token: any,
  {alreadySaved}:any,
  savedJobs: any
): Promise<any> {
  const supabase = await supabaseClient(token);

  if (alreadySaved) {
    const { data, error } = await supabase
      .from("saved_jobs")
      .delete()
      .eq("job_id", savedJobs.job_id);

    if (error) {
      console.error("Error deleting saved jobs:", error);
      return null;
    }

    return data;
  } else {
    const { data, error } = await supabase
      .from("saved_jobs")
      .insert([savedJobs])
      .select();

    if (error) {
      console.error("Error inserting saved jobs:", error);
      return null;
    }

    return data;
  }
}


export async function deleteJob(token:string, { job_id }:any) {
    const supabase = await supabaseClient(token);
  
    const { data, error: deleteError } = await supabase
      .from("jobs")
      .delete()
      .eq("id", job_id)
      .select();
  
    if (deleteError) {
      console.error("Error deleting job:", deleteError);
      return data;
    }
  
    return data;
  }
