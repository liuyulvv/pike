import { Button, Space } from '@arco-design/web-react';
import useDrawStore, { DrawType } from '../store/DrawStore';

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
                        useDrawStore.setState({ type: DrawType.LINE });
                    }}
                >
                    直线
                </Button>
                <Button
                    disabled
                    type="primary"
                    onClick={() => {
                        useDrawStore.setState({ type: DrawType.ARC });
                    }}
                >
                    弧形
                </Button>
                <Button
                    disabled
                    type="primary"
                    onClick={() => {
                        useDrawStore.setState({ type: DrawType.RECTANGLE });
                    }}
                >
                    矩形
                </Button>
                <Button
                    disabled
                    type="primary"
                    onClick={() => {
                        useDrawStore.setState({ type: DrawType.CIRCLE });
                    }}
                >
                    圆形
                </Button>
            </Space>
        </div>
    );
}

export default Navigation;
