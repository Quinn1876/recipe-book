import moment from 'moment';

export const parseTimeForResponse = (time: string): number => moment(time).utcOffset(-6, false).toDate().getTime();
export const parseTimeFromRequest = (time: number): string => (new Date(time)).toISOString().replace('T', ' ').replace('Z', '');
