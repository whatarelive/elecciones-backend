import { Region } from '../interfaces/interfaces';

interface Props {
    data: string,
    validRegion: Region[],
}

export const isProvince = ({data, validRegion}: Props) => {
    return validRegion.find((e) => e.province === data);
};
