export const EVENT_STATUS = {
    LIVE: 'LIVE',
    FINISHED: 'FINISHED',
    SCHEDULED: 'SCHEDULED',
} as const;

export type EventStatusValues = typeof EVENT_STATUS[keyof typeof EVENT_STATUS];
