import { SetStateAction } from "react"

type RangeSliderProps = {
    range: number
    setRange: React.Dispatch<SetStateAction<number>>
}

export default function RangeSlider({ range, setRange }: RangeSliderProps) {
    return (
        <div className="flex justify-between items-center w-full gap-5 text-xs h-8 p-2">
            <h1 className="w-3/12 text-center">Users: 999+</h1>
            <input className="w-1/2 text-center" type='range' value={range} onChange={e => setRange(parseInt(e.target.value))} />
            <h1 className="w-3/12 text-center">{range} Miles</h1>
        </div>
    )
}