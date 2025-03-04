const Insurance = () => {
    return(
        <div class=" px-4 justify-start items-center gap-4 flex">
            <div class="w-[75px] h-[75px] bg-[#5c5c5c]"></div>
            <div class="text-center text-[#293241] text-base font-normal font-['Inter'] tracking-wide">Insurance instance</div>
        </div>
    )
}

export default function Insurances({ user }) {
    return(
        <div class=" py-[22px] rounded-[10px] flex-col justify-start items-start gap-8 flex">
            <div class="w-full px-2.5 pb-2 justify-start items-center gap-2.5 inline-flex border-b border-black/50 mt-16">
                <div class="text-center text-[#293241] font-['Inter'] tracking-wide
                sm:text-xl 
                xs:text-lg ">Insurances</div>
                <div data-svg-wrapper class="relative">
                <svg width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.3028 1.00237C18.9889 1.00237 18.6879 1.12707 18.4659 1.34903C18.244 1.57099 18.1193 1.87204 18.1193 2.18595V5.51653H14.791C14.4771 5.51653 14.1761 5.64123 13.9541 5.86319C13.7322 6.08516 13.6075 6.38621 13.6075 6.70011V10.5467C13.6075 10.8606 13.7322 11.1617 13.9541 11.3837C14.1761 11.6056 14.4771 11.7303 14.791 11.7303H18.1193V15.0585C18.1193 15.3724 18.244 15.6735 18.4659 15.8955C18.6879 16.1174 18.9889 16.2421 19.3028 16.2421H23.1495C23.4634 16.2421 23.7644 16.1174 23.9864 15.8955C24.2084 15.6735 24.3331 15.3724 24.3331 15.0585V11.7303H27.6613C27.9752 11.7303 28.2762 11.6056 28.4982 11.3837C28.7202 11.1617 28.8449 10.8606 28.8449 10.5467V6.70011C28.8449 6.38621 28.7202 6.08516 28.4982 5.86319C28.2762 5.64123 27.9752 5.51653 27.6613 5.51653H24.3331V2.18358C24.3331 1.86967 24.2084 1.56863 23.9864 1.34666C23.7644 1.1247 23.4634 1 23.1495 1L19.3028 1.00237ZM1 24.0821L6.78533 28.904C7.63611 29.6124 8.70822 30.0002 9.81529 30H25.0669C26.1558 30 27.0387 29.1171 27.0387 28.0282C27.0387 25.8504 25.2728 24.0821 23.0927 24.0821H12.4902" fill="#98C1D1" fill-opacity="0.2"/>
                <path d="M1 24.0821L6.78533 28.904C7.63611 29.6124 8.70822 30.0002 9.81529 30H25.0669C26.1558 30 27.0387 29.1171 27.0387 28.0282C27.0387 25.8504 25.2728 24.0821 23.0927 24.0821H12.4902M19.3028 1.00237C18.9889 1.00237 18.6879 1.12707 18.4659 1.34903C18.244 1.57099 18.1193 1.87204 18.1193 2.18595V5.51653H14.791C14.4771 5.51653 14.1761 5.64123 13.9541 5.86319C13.7322 6.08516 13.6075 6.38621 13.6075 6.70011V10.5467C13.6075 10.8606 13.7322 11.1617 13.9541 11.3837C14.1761 11.6056 14.4771 11.7303 14.791 11.7303H18.1193V15.0585C18.1193 15.3724 18.244 15.6735 18.4659 15.8955C18.6879 16.1174 18.9889 16.2421 19.3028 16.2421H23.1495C23.4634 16.2421 23.7644 16.1174 23.9864 15.8955C24.2084 15.6735 24.3331 15.3724 24.3331 15.0585V11.7303H27.6613C27.9752 11.7303 28.2762 11.6056 28.4982 11.3837C28.7202 11.1617 28.8448 10.8606 28.8448 10.5467V6.70011C28.8448 6.38621 28.7202 6.08516 28.4982 5.86319C28.2762 5.64123 27.9752 5.51653 27.6613 5.51653H24.3331V2.18358C24.3331 1.86967 24.2084 1.56863 23.9864 1.34666C23.7644 1.1247 23.4634 1 23.1495 1L19.3028 1.00237Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M8.10147 21.7148L9.87683 23.4901C10.11 23.7233 10.3868 23.9082 10.6914 24.0344C10.996 24.1606 11.3225 24.2255 11.6522 24.2255C11.9819 24.2255 12.3084 24.1606 12.613 24.0344C12.9176 23.9082 13.1944 23.7233 13.4276 23.4901C13.6607 23.257 13.8456 22.9802 13.9718 22.6756C14.098 22.371 14.1629 22.0445 14.1629 21.7148C14.1629 21.385 14.098 21.0586 13.9718 20.7539C13.8456 20.4493 13.6607 20.1725 13.4276 19.9394L10.6722 17.184C9.78455 16.2961 8.58055 15.7971 7.32504 15.7969H1" fill="#98C1D1" fill-opacity="0.2"/>
                <path d="M8.10147 21.7148L9.87683 23.4901C10.11 23.7233 10.3868 23.9082 10.6914 24.0344C10.996 24.1606 11.3225 24.2255 11.6522 24.2255C11.9819 24.2255 12.3084 24.1606 12.613 24.0344C12.9176 23.9082 13.1944 23.7233 13.4276 23.4901C13.6607 23.257 13.8456 22.9802 13.9718 22.6756C14.098 22.371 14.1629 22.0445 14.1629 21.7148C14.1629 21.385 14.098 21.0586 13.9718 20.7539C13.8456 20.4493 13.6607 20.1725 13.4276 19.9394L10.6722 17.184C9.78455 16.2961 8.58055 15.7971 7.32504 15.7969H1" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                </div>
            </div>
            <div class="w-full justify-start items-start gap-5 inline-flex flex-wrap">
                <Insurance />
                <Insurance />
                <Insurance />
            </div>
            <div class=" px-4 justify-center items-center gap-2.5 inline-flex">
                <div class="px-4 py-2 bg-[#3d5a80] rounded-[10px] justify-center items-center gap-2.5 flex">
                    <div class=" text-white text-xs font-['Inter'] tracking-wide">In order to confirm that Dr. Pepe Bolenos Asyinol works with your insurance pla, please contact him.</div>
                </div>
            </div>
        </div>
    );
}