// import { useEffect, useState } from "react";
// import { Dialog } from "@headlessui/react";
// import { useGame } from "~/utils";

// export default function RoundStartOverlay() {
//   let [isOpen, setIsOpen] = useState(true);
//   let [count, setCount] = useState(6);
//   const { seats, roundsCount, roundIdx, round } = useGame();

//   // const loaderData = {
//   //   seats: [
//   //     {
//   //       position: "top",
//   //       username: "x_killua_x",
//   //       totalScore: 0
//   //     },
//   //     {
//   //       position: "left",
//   //       username: "x_killua_x",
//   //       totalScore: 0
//   //     }
//   //   ]
//   // };

//   function handleClose() {
//     setIsOpen(false);
//   }

//   useEffect(() => {
//     function handleCountdownTick() {
//       setTimeout(() => {
//         setCount(count - 1);
//       }, 1000);
//     }
//     if (count > 0) return handleCountdownTick();

//     setIsOpen(false);
//     return () => handleCountdownTick();
//   }, [count]);

//   return (
//     <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
//       <div className="fixed inset-0 mx-0 flex items-center justify-center p-2 backdrop-brightness-50">
//         <Dialog.Panel className="flex w-full flex-col justify-center bg-white p-2 text-sm lg:max-w-2xl lg:text-lg">
//           <Dialog.Title className="pt-4 text-center text-4xl font-semibold">
//             {`ROUND ${roundIdx + 1}/${roundsCount}`}
//           </Dialog.Title>
//           <div className="flex flex-col space-y-1 px-10 py-4">
//             <div className="bg-theme-base-green m-2 grid h-full grid-cols-3 grid-rows-3 text-2xl font-thin ring-4 ring-inset ring-black">
//               {seats.left && (
//                 <div className="col-span-1 row-start-2">
//                   <div className="text-theme-base-white bg-theme-base-white relative flex h-full w-full flex-col ring-4 ring-inset ring-black">
//                     <div className="bg-theme-green-8 absolute -top-5 left-0 right-0 mx-auto flex h-10 w-10 items-center justify-center rounded-full text-center  ring-4 ring-inset ring-black">
//                       {seats.left.position}
//                     </div>
//                     <div className="my-2 flex flex-col items-center justify-center pt-3 leading-tight">
//                       <p className="text-theme-base-black mx-auto py-2 text-center text-3xl">
//                         {seats.left.nametag}
//                       </p>
//                       <p className="text-theme-base-black mx-auto mb-3 text-center text-2xl">
//                         {seats.left.totalScore}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               )}
//               {seats.top && (
//                 <div className="col-start-2">
//                   <div className="bg-theme-base-white text-theme-base-white relative flex h-full w-full flex-col justify-center ring-4 ring-inset ring-black">
//                     <div className="bg-theme-light-blue absolute -top-5 left-0 right-0 mx-auto flex h-10 w-10 items-center justify-center rounded-full text-center ring-4 ring-inset ring-black">
//                       {seats.top.position}
//                     </div>
//                     <div className="my-2 flex flex-col items-center justify-center pt-3 leading-tight">
//                       <p className="text-theme-base-black mx-auto py-2 text-center text-3xl">
//                         {seats.top.nametag}
//                       </p>
//                       <p className="text-theme-base-black mx-auto mb-3 text-center text-2xl">
//                         {seats.top.totalScore}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               <div className="col-start-2 row-start-[3]">
//                 <div className="bg-theme-base-white text-theme-base-white relative flex h-full w-full flex-col ring-4 ring-inset ring-black">
//                   <div className="bg-theme-base-red absolute -top-5 left-0 right-0 mx-auto flex h-10 w-10 items-center justify-center rounded-full text-center ring-4 ring-inset ring-black">
//                     {seats.bottom.position}
//                   </div>
//                   <div className="my-2 flex flex-col items-center justify-center pt-3 leading-tight">
//                     <p className="text-theme-base-black mx-auto py-2 text-center text-3xl">
//                       {seats.bottom.username}
//                     </p>

//                     <p className="text-theme-base-black mx-auto mb-3 text-center text-2xl">
//                       {seats.bottom.totalScore}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//               {seats.right && (
//                 <div className="col-start-3 row-start-2">
//                   <div className="bg-theme-base-white text-theme-base-white relative flex h-full w-full flex-col ring-4 ring-inset ring-black">
//                     <div className="bg-theme-base-yellow absolute -top-5 left-0 right-0 mx-auto flex h-10 w-10 items-center justify-center rounded-full text-center  ring-4 ring-inset ring-black">
//                       {seats.right.position}
//                     </div>
//                     <div className="my-2 flex flex-col items-center justify-center pt-3 leading-tight">
//                       <p className="text-theme-base-black mx-auto py-2 text-center text-3xl">
//                         {seats.right.nametag}
//                       </p>

//                       <p className="text-theme-base-black mx-auto mb-3 text-center text-2xl">
//                         {seats.right.totalScore}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//             <div className="container flex justify-center pb-2 text-center text-xl">
//               {`${round.startingPos} seat plays first`}
//             </div>
//             <button
//               onClick={handleClose}
//               className="bg-theme-base-gray shadow-base text-theme-base-black mx-auto w-3/4 py-1.5 text-xl font-medium outline-none"
//             >
//               {`Accept (Automatically closing in ${count}...)`}
//             </button>
//           </div>
//         </Dialog.Panel>
//       </div>
//     </Dialog>
//   );
// }
