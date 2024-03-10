import { Button, Space } from '@arco-design/web-react';
import useDrawStore, { DrawStateType } from '../store/DrawStore';

function Navigation() {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center'
            }}
        >
            <Space size="large">
                <Button
                    disabled
                    type="primary"
                    onClick={() => {
                        useDrawStore.setState({ type: DrawStateType.LINE });
                    }}
                >
                    直线
                </Button>
                <Button
                    disabled
                    type="primary"
                    onClick={() => {
                        useDrawStore.setState({ type: DrawStateType.ARC });
                    }}
                >
                    弧形
                </Button>
                <Button
                    disabled
                    type="primary"
                    onClick={() => {
                        useDrawStore.setState({ type: DrawStateType.RECTANGLE });
                    }}
                >
                    矩形
                </Button>
                <Button
                    disabled
                    type="primary"
                    onClick={() => {
                        useDrawStore.setState({ type: DrawStateType.CIRCLE });
                    }}
                >
                    圆形
                </Button>
            </Space>
        </div>
    );
}

export default Navigation;
