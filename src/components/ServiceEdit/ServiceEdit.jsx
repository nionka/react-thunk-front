import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { addService, changeEditServiceField, editService } from "../../actions/actionCreators";
import Errors from "../Errors/Errors";
import Loader from "../Loader/Loader";

function ServiceEdit({ match }) {
  const { item, loading, error, success } = useSelector(state => state.serviceEdit);
  const dispatch = useDispatch();

  useEffect(() => {
    editService(dispatch, match.params.id)
  }, [dispatch, match.params.id])

  const handleSubmit = e => {
    e.preventDefault();
    const body = {id: +match.params.id, name: item.name, price: item.price, content: item.content};
    addService(dispatch, body);
  }

  const handleChange = e => {
    const { name, value } = e.target;
    dispatch(changeEditServiceField(name, value))
  }

  if (success) {
    return <Redirect to="/" />
  }

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <Errors />
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label>
        <span>Название</span>
        <input name="name" value={item.name} onChange={handleChange}></input>
      </label>
      <label>
        <span>Стоимость</span>
        <input name="price" value={item.price} onChange={handleChange}></input>
      </label>
      <label>
        <span>Описание</span>
        <textarea name="content" value={item.content} onChange={handleChange}></textarea>
      </label>
      <Link to="/"><button type="button">Отмена</button></Link>
      <button type="submit">Сохранить</button>
    </form>
  )
}

export default ServiceEdit