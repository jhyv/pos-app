import { useEffect, useState } from 'react';
import { useStore } from '../../hooks';
import './ProductSelection.css';
import { ProductCategories } from '../product-categories/ProductCategories';
import { Order, Product } from '../../models';
import { IonBadge, IonIcon, useIonModal } from '@ionic/react';
import { CATEGORY_ICON_LIST, ICON_LIST } from '../../contants';
import { ProductQuanitity } from '../product-quantity/ProductQuantity';

interface ProductSelectionProps { }

export const ProductSelection: React.FC<ProductSelectionProps> = () => {
    const { metadata, products } = useStore();
    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [productList, setProductList] = useState<Product[]>([]);
    const [product, setProduct] = useState<Product>();
    const [state, setState] = useState(false);

    useEffect(() => {
        setCategory('');
        console.log('productList', productList);
        setProductList(products);
    }, [products]);

    useEffect(() => {
        setSubCategory('');
        filterProducts();
    }, [category]);

    useEffect(() => {
        filterProducts();
    }, [subCategory]);

    const filterProducts = () => {
        setProductList(
            products.filter((product) => {
                const hasCategory = product.category_id === parseInt(category);
                const hasSubCategory = hasCategory && product.sub_category_id === parseInt(subCategory);

                if (category != '') {
                    if (subCategory != '') {
                        return hasCategory && hasSubCategory;
                    }
                    return hasCategory;
                }

                return true;
            })
        );
    }

    const displayIcon = (icon: any) => {
        const Icon = icon;

        return <Icon />;
    }

    const selectProduct = (product: Product) => {
        setState((oldVal) => {
            setProduct(product)

            return true;
        });
    }

    return (
        <>
            <div className='products-wrapper'>
                <div className='category-container sticky'>
                    <div className={`category-item ${category === '' && 'active'}`} onClick={() => setCategory('')}>
                        {
                            displayIcon(CATEGORY_ICON_LIST[0])
                        }
                        <div>
                            All
                        </div>
                    </div>
                    {
                        metadata?.categories && metadata.categories.length > 0 &&
                        metadata.categories.map((item: any) => (
                            <div className={`category-item ${item.id === category && 'active'}`} key={`category-${item.id}`} onClick={() => setCategory(item.id)}>
                                {
                                    displayIcon(CATEGORY_ICON_LIST[item.id])
                                }
                                <div>
                                    {item.name}
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className='product-container'>
                    <ProductCategories
                        categories={metadata?.categories || []}
                        categoryId={category}
                        setCategory={setCategory}
                        subCategories={metadata?.sub_categories || []}
                        subCategoryId={subCategory}
                        setSubCategory={setSubCategory}
                    />
                    {
                        productList.length > 0 &&
                        productList.map((product) => (
                            <div key={product.id} className='product-item' onClick={() => selectProduct(product)}>
                                <div className='product-icon'>
                                    <IonIcon icon={ICON_LIST[product?.icon ?? ICON_LIST['fast-food-outline']]} />
                                </div>
                                <div className='product-details'>
                                    <div className='product-name'>{product.name}</div>
                                    <div className='product-category'>
                                        <IonBadge color='primary'>{product.category.name}</IonBadge>
                                        <IonBadge color='medium'>{product.sub_category.name}</IonBadge>
                                    </div>
                                    {
                                        !product.isDynamicPrice && product.hasStock &&
                                        <div className='product-stock'>Stock: <span>{product.stock}</span></div>
                                    }
                                </div>
                                {
                                    !product.isDynamicPrice && product.hasStock &&
                                    <div className='product-price'>
                                        P {product.price}
                                    </div>
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
            {
                product &&
                <ProductQuanitity
                    state={state}
                    setState={setState}
                    product={product}
                    onModalClose={() => setState(false)}
                />
            }
        </>
    );
}