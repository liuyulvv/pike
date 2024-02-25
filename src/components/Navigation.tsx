import { Button, Space } from '@arco-design/web-react';

function Navigation() {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center'
            }}
        >
            <Space size="large">
                <Button disabled type="primary">
                    直线
                </Button>
                <Button disabled type="primary">
                    弧形
                </Button>
                <Button disabled type="primary">
                    矩形
                </Button>
            </Space>
        </div>
    );
}

export default Navigation;
