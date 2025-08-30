import { Head } from '~/components/shared/Head';

function Index() {
  return (
    <>
      <Head title="Scrabble Calculator" />
      <div className="hero min-h-screen">
        <div className="text-center hero-content">
          <div>
            <h1 className="text-3xl font-bold">
              Scrabble Calculator
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
