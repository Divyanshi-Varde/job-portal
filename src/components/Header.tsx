import {
  SignedIn,
  SignedOut,
  SignIn,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import { BriefcaseBusinessIcon, HeartIcon, PenBox } from "lucide-react";
import { useEffect, useState } from "react";

const Header = () => {

    const {user} = useUser();   
    const [search,setSearch] = useSearchParams()
    const [showSignIn, setShowSignIn]= useState(false)

    useEffect(()=>{
        if(search.get("sign-in")){
            setShowSignIn(true)
        }
    },[search])

    const handleOverlayClick = (e:any) => {
        if(e.target === e.currentTarget){
            setShowSignIn(false)
            setSearch('')
        }
    }

  return (
    <>
      <nav className="py-4 flex justify-between items-center">
        <Link to="">
          <img src="/logo.png" className="h-20" />
        </Link>
        <div>
          <SignedOut>
            <Button variant={"outline"} onClick={()=>setShowSignIn(true)}>Login</Button>
          </SignedOut>
          <SignedIn>
            <div className="flex gap-4">
              {user?.unsafeMetadata.role === "recruiter" && (
                <Link to={"/post-jobs"}>
                <Button variant={"destructive"} className="rounded-full">
                  <PenBox size={20} className="mr-2" />
                  Post a Job
                </Button>
              </Link>
              )}
              <UserButton appearance={{
                elements:{
                    avatarBox:'w-10 h-10'
                }
              }
              }>
                <UserButton.MenuItems>
                    <UserButton.Link 
                    label="My jobs"
                    labelIcon={<BriefcaseBusinessIcon size={15}/>}
                    href="/my-jobs"/>

                <UserButton.Link 
                    label="Saved jobs"
                    labelIcon={<HeartIcon size={15}/>}
                    href="/saved-jobs"/>
                    
                </UserButton.MenuItems>
              </UserButton>
            </div>
          </SignedIn>
        </div>
      </nav>

      {showSignIn && 
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
      onClick={handleOverlayClick}>
        <SignIn
        signUpForceRedirectUrl={"/onboarding"}
        fallbackRedirectUrl={"/onboarding"}/>
      </div>}
    </>
  );
};

export default Header;
