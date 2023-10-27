"use client";
import Wrap from "@/components/wrap";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
type Props = {};

const Page = (props: Props) => {
  type Plan = {
    title: string;
    price: string;
    features: string[];
  };

  const plans: Plan[] = [
    {
      title: "Basic Plan",
      price: "$9.99/month",
      features: ["- 10 pages per week", "- 4 MB file", "- Mobile Friendly"],
    },
    {
      title: "Pro Plan",
      price: "$19.99/month",
      features: [
        "- 25 pages per week",
        "- 10 MB file",
        "- Higher Quality Responses",
      ],
    },
  ];
  return (
    <>
      <Wrap>
        <div className="mx-auto p-8 flex flex-col items-center ">
          <h1 className="text-2xl sm:text-3xl font-semibold text-center mb-2 sm:mb-8 text-white">
            Pricing
          </h1>
          <Separator className="bg-muted-foreground"></Separator>
          <section className="flex  flex-wrap justify-center border">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={
                  "relative rounded-lg shadow-md sm:h-[40rem] p-6 m-4 w-full h-80 sm:w-4/5 md:w-96 bg-gray-900 flex flex-col"
                }
              >
                <div>
                  <h2 className="text-2xl font-semibold text-white">
                    {plan.title}
                  </h2>
                  <hr className="my-3" />
                  <p className="text-2xl text-muted-foreground">{plan.price}</p>
                  <ul className="mt-4">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="text-gray-600">
                        <i className="fas fa-check-circle text-green-500"></i>{" "}
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-auto w-full">
                  <Button className="w-full">Purchase</Button>
                </div>
              </div>
            ))}
          </section>
        </div>
      </Wrap>
    </>
  );
};

export default Page;
