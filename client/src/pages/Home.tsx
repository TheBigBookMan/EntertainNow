import Form from "../components/feature/Form";
import Container from "../components/common/Container";

//* Component for the home page with instructions
const Home = ({ criteria, setCriteria }: CriteriaState) => {
  return (
    <Container displayActive={null}>
      <p className="text-md mb-2 max-w-xl text-center text-zinc-100">
        Type in entertainment criteria that you are looking for or search a
        title! A list of entertainment matching the input will present. If you
        create an account you will be able to watch a trailer for them. You can
        also save the trailer to favourites to watch at a later date! Happy
        searching...
      </p>
      <Form criteria={criteria} setCriteria={setCriteria} />
    </Container>
  );
};

export default Home;
