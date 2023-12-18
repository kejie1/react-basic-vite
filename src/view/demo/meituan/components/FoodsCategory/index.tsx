import {Foods} from './FoodItem/index'
import './index.scss'

export const FoodsCategory = ({ name, foods }) => {
  return (
    <div className="category">
      <dl className="cate-list">
        <dt className="cate-title">{name}</dt>

        {foods.map(item => {
          return <Foods key={item.id} {...item} />
        })}
      </dl>
    </div>
  )
}
