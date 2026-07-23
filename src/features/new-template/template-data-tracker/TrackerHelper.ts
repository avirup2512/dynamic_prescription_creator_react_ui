
export interface TrackerConfig<T> {
    list: T[];
    payload: T;
    nestedKey: string;
    idKey: string;
}

export class TrackerHelper {

    /**
     * Add or Update an operation in changelog
     */
    static upsert<T extends Record<string, any>>({
        list,
        payload,
        nestedKey,
        idKey,
    }: TrackerConfig<T>) {

        const id = payload?.[nestedKey]?.[idKey];

        const index = list.findIndex(
            item => item?.[nestedKey]?.[idKey] === id
        );

        if (index >= 0) {

            const existing = list[index];

            /**
             * If entity is NEW,
             * never convert ADD into UPDATE.
             */
            if (
                existing.type?.endsWith("Add") &&
                payload.type?.endsWith("Update")
            ) {

                list[index] = {
                    ...existing,
                    ...payload,
                    type: existing.type,
                };

                return;
            }

            list[index] = {
                ...existing,
                ...payload,
            };

            return;
        }

        list.push(payload);
    }

    /**
     * Remove an operation completely
     */
    static remove<T extends Record<string, any>>({
        list,
        nestedKey,
        idKey,
        id,
    }: {
        list: T[];
        nestedKey: string;
        idKey: string;
        id: string;
    }) {

        const index = list.findIndex(
            item => item?.[nestedKey]?.[idKey] === id
        );

        if (index >= 0)
            list.splice(index, 1);
    }

    /**
     * Check if entity already exists
     */
    static exists<T extends Record<string, any>>({
        list,
        nestedKey,
        idKey,
        id,
    }: {
        list: T[];
        nestedKey: string;
        idKey: string;
        id: string;
    }) {

        return list.some(
            item => item?.[nestedKey]?.[idKey] === id
        );
    }

    /**
     * Get operation
     */
    static find<T extends Record<string, any>>({
        list,
        nestedKey,
        idKey,
        id,
    }: {
        list: T[];
        nestedKey: string;
        idKey: string;
        id: string;
    }) {

        return list.find(
            item => item?.[nestedKey]?.[idKey] === id
        );
    }

}