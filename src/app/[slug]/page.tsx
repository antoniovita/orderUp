import { db } from "@/lib/prisma";
import { getRestaurantBySlug } from "../data/get-restaurant-by-slug";
import Image from "next/image"
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";


interface RestaurantPageProps {
    params: Promise<{slug: string}>
}

const RestaurantPage = async ({params}: RestaurantPageProps) => {
    const {slug} = await params
    const restaurant = await getRestaurantBySlug(slug);
    if (!restaurant) {
        return notFound();
    }

    return ( 
    <div className="h-screen flex flex-col items-center justify-center px-6 pt-24">
        <div className="flex flex-col items-center gap-2">
            <Image width={82} height={82} src={restaurant?.avatarImageUrl} alt={restaurant?.name}></Image>
            <h1 className="font-semibold">{restaurant?.name}</h1> 
        </div>
        <div className="pt-24 text-center space-y-2">
            <h3 className="text-2xl font-semibold">
                Seja bem-vindo!
            </h3>
            <p>
                Escolha como prefere aproveitar a sua refeição.
            </p>
        </div>
        <div className="pt-14 grid grid-cols-2 gap-4">
            <Card>
                <CardContent className="flex flex-col items-center gap-8 py-8">
                    <div className="relative h-[80px] w-[80px]">
                        <Image fill className="object-contain" src={"/dine_in.png"} alt="dine_in" ></Image>
                    </div>
                    <Button variant="secondary" className="rounded-full">
                        Para comer aqui
                    </Button>  
                </CardContent>
            </Card>

            <Card>
                <CardContent className="flex flex-col items-center gap-8 py-8">
                    <div className="relative h-[80px] w-[80px]">
                        <Image fill className="object-contain" src={"/takeaway.png"} alt="takeaway" ></Image>
                    </div>
                    <Button variant="secondary" className="rounded-full">
                        Para levar
                    </Button>  
                </CardContent>
            </Card>

        </div>
    </div>


    );
}
 
export default RestaurantPage;