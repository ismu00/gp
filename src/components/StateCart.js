export default function StateCart({name,icon: Icon, value}){
return (
    <div className="bg-[#1e1e1e] backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-[#1f1f1f1f]">
        <div className="px-4 py-5 sm:p-6">
            <span className="flex items-center text-sm font-medium text-gray-300">
                <Icon size={20} className="mr-2" />
                {name}
            </span>
            <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
        </div>
    </div>
)
}