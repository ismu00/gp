import StateCart from "@/components/StateCart";
import { IndianRupee } from "lucide-react";

export default function Overview(){
    return (
        <div className="flex-1 overflow-auto relative z-10">
            <main className="max-w-7xl mx-auto py-4 px-4 lg:py-6">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-0">
                    <StateCart name="Total Sales" icon={IndianRupee} value="102233"/>
                   
                   
                </div>
            </main>
            
        </div>
    )
}