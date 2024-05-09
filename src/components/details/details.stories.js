import Detail from './detail';
import DetailHeader from './detail-header';
import DetailText from './detail-text';
import DetailRow from './detail-row';
import Details from './details';

export const Default = {
    render: () => (
        <Details>
            <DetailRow>
                <Detail>
                    <DetailHeader>
                        Lorem ipsum
                    </DetailHeader>

                    <DetailText>
                        Lorem ipsum dolor sit amet
                    </DetailText>
                </Detail>

                <Detail>
                    <DetailHeader>
                        Lorem ipsum
                    </DetailHeader>

                    <DetailText>
                        Lorem ipsum dolor sit amet
                    </DetailText>
                </Detail>

                <Detail>
                    <DetailHeader>
                        Lorem ipsum
                    </DetailHeader>

                    <DetailText>
                        Lorem ipsum dolor sit amet
                    </DetailText>
                </Detail>
            </DetailRow>

            <DetailRow>
                <Detail>
                    <DetailHeader>
                        Lorem ipsum
                    </DetailHeader>

                    <DetailText>
                        Lorem ipsum dolor sit amet
                    </DetailText>
                </Detail>

                <Detail>
                    <DetailHeader>
                        Lorem ipsum
                    </DetailHeader>

                    <DetailText>
                        Lorem ipsum dolor sit amet
                    </DetailText>
                </Detail>

                <Detail>
                    <DetailHeader>
                        Lorem ipsum
                    </DetailHeader>

                    <DetailText>
                        Lorem ipsum dolor sit amet
                    </DetailText>
                </Detail>
            </DetailRow>
        </Details>
    )
};

export default {
    component: Detail
};
