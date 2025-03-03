import { useRef, useState } from 'react';

const NUM_DAYS = 10;
const Medicine = ({ medicine, printObject }) => {
  const inputRef = useRef(null);
  const [value, setValue] = useState(0);
  const getValue = () => {
    const tabletsPerSlot = medicine?.dailyDose * NUM_DAYS;
    const existingTablets = inputRef?.current?.value || 0;
    const tabletsPerStrip = medicine?.stripContains;
    const neededTablets = tabletsPerSlot - existingTablets;
    const neededStrips = Math.ceil(neededTablets / tabletsPerStrip);
    printObject[medicine?.name] = neededStrips;
    setValue(neededStrips);
  };
  return (
    <div className="grid grid-cols-6 items-center gap-2 lg:gap-6">
      <h2 className="text-xs lg:text-2xl font-semibold col-span-1">{medicine?.name}</h2>
      <input
        onChange={getValue}
        ref={inputRef}
        className="py-2 px-4 border border-black rounded-lg col-span-2 col-span-4"
        type="text"
        placeholder="Existing tablet count"
      />
      <h2 className="displayValue text-xs lg:text-2xl font-semibold col-span-1">{value} strips</h2>
    </div>
  );
};
export default function Home() {
  const medicines = [
    {
      name: 'Tolvaptan',
      stripContains: 10,
      dailyDose: 1,
    },
    {
      name: 'Vilfuro-G',
      stripContains: 10,
      dailyDose: 1,
    },
    {
      name: 'AB-Flo-N',
      stripContains: 10,
      dailyDose: 2,
    },
    {
      name: 'Telma 80',
      stripContains: 15,
      dailyDose: 2,
    },
    {
      name: 'Moxovas 0.3',
      stripContains: 10,
      dailyDose: 3,
    },
    {
      name: 'Nicardia 20',
      stripContains: 15,
      dailyDose: 3,
    },
  ];
  let printObject = {};

  const copyToClipboard = () => {
    const wrapperElement = document.createElement('div');
    for (const [key, value] of Object.entries(printObject)) {
      wrapperElement.append(`
        ${key} ${value}
      `);
    }
    let tempInput = document.createElement('textarea');
    const text = wrapperElement?.innerText?.replace(/<br\s*[\/]?>/gi, '');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
  };
  return (
    <>
      <div className="flex flex-col gap-6 p-4 lg:max-w-1/2">
        {medicines?.map((medicine, index) => {
          return (
            <Medicine
              printObject={printObject}
              medicine={medicine}
              key={index}
            />
          );
        })}
      </div>
      <div className="p-4 lg:max-w-1/4">
        <button
          onClick={copyToClipboard}
          className="border border-black py-2 px-4 w-full bg-black text-white cursor-pointer"
        >
          Copy
        </button>
      </div>
    </>
  );
}
