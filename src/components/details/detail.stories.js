import Detail from './detail';
import DetailHeader from './detail-header';
import DetailText from './detail-text';

export const Default = {
    render: () => (
        <Detail>
            <DetailHeader>
                Lorem ipsum
            </DetailHeader>

            <DetailText>
                Lorem ipsum dolor sit amet
            </DetailText>
        </Detail>
    )
};

export default {
    component: Detail
};
