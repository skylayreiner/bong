export default function RoomIndexRoute() {
  return (
    <div className="max-w-6xl bg-primary-green-6 sm:px-6 lg:px-8">
      <div className="absolute inset-x-[11%] bottom-[20.5%] top-[18.5%] flex-col">
        <div className="relative grid h-full grid-cols-12 grid-rows-8">
          <div className="row-span-1 col-span-11">
            <div className="justify-left flex h-8 w-full items-center rounded-full bg-primary-green-8"></div>
          </div>
          <div className="col-start-1 row-span-7 row-start-2">
            <div className="flex h-full w-8 flex-col items-center justify-end rounded-full bg-primary-green-8"></div>
          </div>

          <div className="col-span-1 col-start-12 row-span-7">
            <div className="relative ml-auto flex h-full w-8 flex-col items-center justify-start rounded-full bg-primary-green-8 py-4"></div>
          </div>
          <div className="row-start-9 col-span-11 col-start-2 flex flex-col justify-end">
            <div className="flex h-8 w-full items-center justify-end rounded-full bg-primary-green-8"></div>
          </div>
          <div className="col-span-2 col-start-[2] row-span-6 row-start-2 my-auto"></div>
          <div className="col-span-8 col-start-[4] row-span-6 row-start-2 -m-2 bg-primary-green-8"></div>
          <div className="absolute inset-x-0 top-[103.5%]"></div>
        </div>
      </div>
    </div>
  );
}
