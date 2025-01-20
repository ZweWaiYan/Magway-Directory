import { FaHouseUser } from "react-icons/fa";
import { FaPlaceOfWorship } from "react-icons/fa6";
import { IoFastFoodSharp } from "react-icons/io5";

const Category = () => {
    return (
        <div className="lg:p-10 p-3 flex justify-center">
            <div className="grid grid-cols-3 bg-gradient-to-r from-cyan-600 to-cyan-800 p-1 rounded-lg shadow-lg gap-6 justify-items-center items-center">
                <div
                    onClick={() => { document.getElementById('pagoda').scrollIntoView({ behavior: 'smooth' }) }}
                    className="cursor-pointer group relative p-4 rounded-lg hover:bg-gradient-to-r hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 hover:shadow-[0px_0px_20px_5px_rgba(59,130,246,0.75)] hover:drop-shadow-xl transition-all duration-300"
                >
                    <div className="flex font-bold text-white gap-3 items-center">
                        <FaPlaceOfWorship className="mb-1 size-6 group-hover:scale-125 transition-transform duration-300" />
                        <div className="group-hover:underline">Pagoda</div>
                    </div>
                </div>
                <div
                    onClick={() => { document.getElementById('food').scrollIntoView({ behavior: 'smooth' }) }}
                    className="cursor-pointer group relative p-4 rounded-lg hover:bg-gradient-to-r hover:from-red-500 hover:via-red-600 hover:to-red-700 hover:shadow-[0px_0px_20px_5px_rgba(239,68,68,0.75)] hover:drop-shadow-xl transition-all duration-300"
                >
                    <div className="flex font-bold text-white gap-3 items-center">
                        <IoFastFoodSharp className="mb-1 size-6 group-hover:scale-125 transition-transform duration-300" />
                        <div className="group-hover:underline">Food</div>
                    </div>
                </div>
                <div
                    onClick={() => { document.getElementById('hotal').scrollIntoView({ behavior: 'smooth' }) }}
                    className="cursor-pointer group relative p-4 rounded-lg hover:bg-gradient-to-r hover:from-green-500 hover:via-green-600 hover:to-green-700 hover:shadow-[0px_0px_20px_5px_rgba(34,197,94,0.75)] hover:drop-shadow-xl transition-all duration-300"
                >
                    <div className="flex font-bold text-white gap-3 items-center">
                        <FaHouseUser className="mb-1 size-6 group-hover:scale-125 transition-transform duration-300" />
                        <div className="group-hover:underline">Hotel</div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Category;