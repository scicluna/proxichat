import { SetStateAction } from "react"

type RangeSliderProps = {
    range: number
    setRange: React.Dispatch<SetStateAction<number>>
    userCount: number
}

export default function RangeSlider({ range, setRange, userCount }: RangeSliderProps) {
    return (
        <div className="flex justify-between items-center w-auto gap-5 text-xs h-8 p-1 m-1 shadow-md shadow-gray-300 bg-gray-100">
            <h1 className="w-3/12 text-center font-bold text-gray-400">Users: {userCount}</h1>
            <input className="w-1/2 text-center" type='range' value={range} onChange={e => setRange(parseInt(e.target.value))} />
            <h1 className="w-3/12 text-center font-bold text-gray-400">{range} Miles</h1>
        </div>
    )
}