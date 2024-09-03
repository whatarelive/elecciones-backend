import { Region } from '../interfaces/interfaces';

interface Props {
    data: {
      province: string;
    },
    validRegion: Region[],
}

export const isProvince = ({data, validRegion}: Props) => {
    return validRegion.find((e) => e.province === data.province);
};
