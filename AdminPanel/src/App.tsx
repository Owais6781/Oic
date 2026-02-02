import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Panel from "./component/Admin/sidebare";

import Table from "./component/News/NewsTable";
import NewsForm from "./component/News/NewsForm";
import NewsView from "./component/News/NewsView"
import NewsEdit from "./component/News/NewsEdit";

import PublicationTable from "./component/publication/PublicationTable";
import Publication from "./component/publication/PublicationForm";
import PublicationView from "./component/publication/PublicationView";

import AboutTable from "./component/About/AboutTable";
import About from "./component/About/About";
import AboutView from "./component/About/AboutView";

import LegalTable from "./component/Legal-instruments/LegalTable";
import Legal from "./component/Legal-instruments/LegalForm";
import LegalView from "./component/Legal-instruments/LegalView";

import ActivitiesTable from "./component/Activities/activitiesTable";
import ActivitiesForm from "./component/Activities/ActivitiesForm";
import ActivitiesView from "./component/Activities/ActivitiesView";

import Conference from "./component/Activities/Conferenc&Meeting/Conference";
import ActivitiesTbConference from "./component/Activities/Conferenc&Meeting/ActivitiesTbConference";
import ConferenceView from "./component/Activities/Conferenc&Meeting/ConferenceView";

import SessionTable from "./component/Session/AboutSession/SessionTable";
import SessionForm from "./component/Session/AboutSession/SessionForm";
import SessionView from "./component/Session/AboutSession/SessionView";


import SessionDocTable from "./component/Session/SessionDocument/SessionDocTable";
import SessionDocumentForm from "./component/Session/SessionDocument/SessionDocumentForm";
import SessionDocumentView from "./component/Session/SessionDocument/SessionDocumentView";
import DocumentTable from "./component/Document/DocumentTable";
import DocumentForm from "./component/Document/DocumentForm";
import DocumentView from "./component/Document/DocumentView";
import AboutMemberTable from "./component/About/Commission Members/AboutmemberTable";
import AboutMemberForm from "./component/About/Commission Members/AboutMemerForm";
import AboutMemberView from "./component/About/Commission Members/AboutMemberView";
import ContactTable from "./Contact/ContactTable";
import ContactView from "./Contact/ContactView";





const AppLayout = () => {
  const location = useLocation();
  const state = location.state && location.state.background;

  return (
    <div className=" layout">
      <Panel />

      <div className=" content">
        <Routes location={state || location}>
          <Route path="/" element={< Table />} />
          <Route path="/newsform" element={<NewsForm />} />
          <Route path="/view/:id" element={< NewsView />} />
          <Route path="/NewsEdit/:id" element={<NewsEdit />} />

          <Route path="/PublicationTable" element={<PublicationTable />} />
          <Route path="/Publication" element={<Publication />} />
          <Route path="/publicationview/:id" element={<PublicationView />} />

          <Route path="/aboutTable" element={< AboutTable />} />
          <Route path="about" element={<About />} />
          <Route path="aboutview/:id" element={<AboutView />} />



          <Route path="/aboutMemberTable" element={<AboutMemberTable />} />
          <Route path="/aboutMemberForm" element={<AboutMemberForm />} />
          <Route path="/aboutMemberView/:id" element={<AboutMemberView />} />

          <Route path="/legalTable" element={< LegalTable />} />
          <Route path="/legalForm" element={< Legal />} />
          <Route path="/legalView/:id" element={<LegalView />} />


          <Route path="/activitiesTable" element={<ActivitiesTable />} />
          <Route path="/activitiesForm" element={<ActivitiesForm />} />
          <Route path="/activitiesView/:id" element={<ActivitiesView />} />

          <Route path="/activiesConference" element={< ActivitiesTbConference />} />
          <Route path="/Conference" element={<Conference />} />
          <Route path="/ConferenceView/:id" element={<ConferenceView />} />


          <Route path="/AboustSession" element={<SessionTable />} />
          <Route path="/AboutSessionForm" element={<SessionForm />} />
          <Route path="/AboutSessionView/:id" element={< SessionView />} />



          <Route path="/SessionDocTable" element={<SessionDocTable />} />
          <Route path="/SessionDocumentForm" element={<SessionDocumentForm />} />
          <Route path="/SessionDocumentView/:id" element={<SessionDocumentView />} />


          <Route path="/DocumentTable" element={<DocumentTable />} />
          <Route path="/DocumentForm" element={<DocumentForm />} />
          <Route path="/DocumentView/:id" element={<DocumentView />} />


          <Route path="/contactTable" element={<ContactTable />} />
          <Route path="/ContactView/:id" element={<ContactView/>}/>
        </Routes>

      </div>
    </div>

  )
}


const App = () => (
  <BrowserRouter>
    <AppLayout />
  </BrowserRouter>
);
export default App;
