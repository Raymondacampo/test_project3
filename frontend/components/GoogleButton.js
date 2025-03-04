export default function GoogleButton() {
    return (
        <button class="self-stretch px-4 py-3 bg-white rounded-[10px] shadow-[0px_2px_3px_0px_rgba(0,0,0,0.17)] justify-center items-center gap-[15px] inline-flex">
            <div data-svg-wrapper class="relative">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" fill="white"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M23.04 12.2605C23.04 11.445 22.9668 10.6609 22.8309 9.9082H12V14.3566H18.1891C17.9225 15.7941 17.1123 17.0121 15.8943 17.8275V20.713H19.6109C21.7855 18.7109 23.04 15.7627 23.04 12.2605Z" fill="#4285F4"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 23.5005C15.105 23.5005 17.7081 22.4708 19.6109 20.7144L15.8943 17.829C14.8645 18.519 13.5472 18.9267 12 18.9267C9.00474 18.9267 6.46951 16.9037 5.56519 14.1855H1.72314V17.1651C3.61542 20.9235 7.50451 23.5005 12 23.5005Z" fill="#34A853"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.56523 14.1855C5.33523 13.4955 5.20455 12.7584 5.20455 12.0005C5.20455 11.2425 5.33523 10.5055 5.56523 9.81548V6.83594H1.72318C0.944318 8.38844 0.5 10.1448 0.5 12.0005C0.5 13.8562 0.944318 15.6125 1.72318 17.165L5.56523 14.1855Z" fill="#FBBC05"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 5.07386C13.6884 5.07386 15.2043 5.65409 16.3961 6.79364L19.6945 3.49523C17.7029 1.63955 15.0997 0.5 12 0.5C7.50451 0.5 3.61542 3.07705 1.72314 6.83545L5.56519 9.815C6.46951 7.09682 9.00474 5.07386 12 5.07386Z" fill="#EA4335"/>
            </svg>
            </div>
            <div class="text-black text-md font-light tracking-wide">Sign up with Google</div>
        </button>
    )
}