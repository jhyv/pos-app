import { useEffect } from 'react';
import { Cart, Layout, ProductSelection } from '../../components';
import './Pos.css';

interface PosProps { }

export const Pos: React.FC<PosProps> = () => {

    useEffect(() => {

    }, []);

    return (
        <Layout>
            <div className='pos-wrapper'>
                <ProductSelection

                />
                <Cart />
            </div>
        </Layout>
    );
}