import SignupForm from "@/components/forms/SignupForm"
import Benefits from "@/components/forms/Benefits"

export default function Signup() {
    return(
        <div className="w-full flex-col justify-center items-center gap-16 inline-flex
        md:pt-9
        sm:px-2 
        xs:px-0 xs:pb-9">
            <div class="pt-8 pb-12 bg-[#98c1d1]/20 rounded-[15px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] items-center inline-flex
            lg:gap-24 lg:justify-start
            md:justify-between md:gap-16 md:flex-row md:w-auto
            sm:px-8 sm:w-[95%] 
            xs:flex-col xs:gap-8 xs:w-full xs:px-2">
                <SignupForm/>
                <Benefits/>
            </div>
            </div>
    )
}