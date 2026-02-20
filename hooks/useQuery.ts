"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

export type UseQueryProps = {
    initialQuery?: {
        name: string;
        value: string | number | boolean;
    }[];
};

export const useQuery = ({ initialQuery }: UseQueryProps = {}) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const initialized = useRef(false);

    const update = useCallback(
        (params: URLSearchParams) => {
            const query = params.toString();
            router.replace(query ? `${pathname}?${query}` : pathname);
        },
        [router, pathname],
    );

    const set = useCallback(
        (name: string, value: string): void => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, String(value));
            update(params);
        },
        [searchParams, update],
    );

    const get = useCallback(
        (name: string): string | null => {
            return searchParams.get(name);
        },
        [searchParams],
    );

    const remove = useCallback(
        (name: string): void => {
            const params = new URLSearchParams(searchParams.toString());
            params.delete(name);
            update(params);
        },
        [searchParams, update],
    );

    useEffect(() => {
        if (!initialQuery || initialized.current) return;

        const params = new URLSearchParams(searchParams.toString());
        let changed = false;

        initialQuery.forEach(({ name, value }) => {
            if (!params.has(name)) {
                params.set(name, String(value));
                changed = true;
            }
        });

        if (changed) update(params);

        initialized.current = true;
    }, [initialQuery, searchParams, update]);

    return { set, get, remove };
};
