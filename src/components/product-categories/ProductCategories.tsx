import { IonSegment, IonSegmentButton } from '@ionic/react';
import './ProductCategories.css';
interface ProductCategoriesProps {
    categories: any[];
    categoryId: any;
    setCategory: any;
    subCategoryId: any;
    setSubCategory: any;
    subCategories: any[];
}

export const ProductCategories: React.FC<ProductCategoriesProps> = ({
    categories,
    categoryId,
    subCategories,
    subCategoryId,
    setCategory,
    setSubCategory
}) => {

    console.log('categoryId', categoryId);
    console.log('subCategories', subCategories);
    console.log('subCategories filtered', subCategories.filter(i => i.id === categoryId));
    return (
        <>
            {
                categoryId != '' && subCategories.filter(i => i.category_id === categoryId).length > 0 &&
                <div className='sticky'>
                    <IonSegment value={subCategoryId} scrollable mode='ios'>
                        <IonSegmentButton value={''} onClick={() => setSubCategory('')}>
                            All
                        </IonSegmentButton>
                        {
                            subCategories?.length > 0 &&
                            subCategories.filter(i => i.category_id === categoryId).map((category) => (
                                <IonSegmentButton value={category.id} key={`subcategory-segment-${category.id}`} onClick={() => setSubCategory(category.id)}>
                                    {category.name}
                                </IonSegmentButton>
                            ))
                        }
                    </IonSegment>
                </div>
            }
        </>
    )
}