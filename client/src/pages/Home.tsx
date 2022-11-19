import Form from "../components/feature/Form";
import Container from "../components/common/Container";

//! GET RID OF ANY
const Home = ({ criteria, setCriteria }: any) => {
  return (
    <Container>
      <h1>
        Type in entertainment criteria that you are looking for or search a
        title! A list of entertainment matching the input will present. If you
        create an account you will be able to watch a trailer for them. You can
        also save the trailer to favourites to watch at a later date! Happy
        searching...
      </h1>
      <Form criteria={criteria} setCriteria={setCriteria} />
    </Container>
  );
};

export default Home;
