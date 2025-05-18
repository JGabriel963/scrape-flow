"use client"

import { usePathname } from "next/navigation"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "../ui/breadcrumb";
import { Fragment } from "react";
import { SidebarMobile } from "./Sidebar";

export default function BreadcrumbHeader() {
    const pathName = usePathname();
    const paths = pathName === "/" ? [""] : pathName.split("/");

  return (
    <div className="flex items-center flex-start">
        <SidebarMobile />
        <Breadcrumb>
            <BreadcrumbList>
                {paths.map((path, index) => (
                    <Fragment key={index}>
                        <BreadcrumbItem>
                            <BreadcrumbLink
                                className="capitalize"
                                href={`/${path}`}
                            >
                                {path === "" ? "home": path}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        {path !== paths[paths.length - 1] && <BreadcrumbSeparator />}
                    </Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    </div>
  )
}
