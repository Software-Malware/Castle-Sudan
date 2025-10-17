"use client";

import Connect from "@/app/money/components/Connect";
import Hacker from "@/app/money/components/hacker";

export default function Money() { 

    return (
        <div className="items-center text-center items-center mt-24">
            <Connect />
            <Hacker />
        </div>
    );
}