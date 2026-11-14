import { useState } from "react";
import { Link } from "react-router";
import {
  Heart,
  LogOut,
  MapPin,
  Package,
  Settings,
  UserRound,
} from "lucide-react";
import { useStore } from "../context/StoreContext";
import PageHeading from "../components/Common/PageHeading";
import Container from "../components/Layout/Container";
import LoginForm from "../components/Auth/LoginForm";
import ProfileInfo from "../components/Profile/ProfileInfo";
import AddressBook from "../components/Profile/AddressBook";
import AccountSettings from "../components/Profile/AccountSettings";
import { notify } from "../components/Common/Toast";

export default function Profile() {
  const { user, setUser, updateProfile } = useStore();
  const [activeSection, setActiveSection] = useState("profile");

  if (!user) {
    return (
      <Container as="main" className="min-h-[55vh] py-12 max-[600px]:py-7">
        <PageHeading eyebrow="YOUR ACCOUNT" title="Sign in to your account">
          <p>
            Sign in to manage saved details, view purchase history and update
            preferences.
          </p>
        </PageHeading>
        <LoginForm />
      </Container>
    );
  }

  const selectSection = (section) => (event) => {
    event.preventDefault();
    setActiveSection(section);
  };

  const signOut = () => {
    setUser(null);
    notify("You have been signed out.");
  };

  return (
    <Container as="main" className="min-h-[55vh] py-[70px] max-[600px]:py-8">
      <PageHeading eyebrow="YOUR ACCOUNT" title="My account">
        <p>
          Manage profile information, saved delivery addresses and account
          security.
        </p>
      </PageHeading>

      {/* Mobile section tabs */}
      <div className="mb-4 flex gap-2 overflow-x-auto pb-1 sm:hidden">
        <button
          type="button"
          onClick={() => setActiveSection("profile")}
          className={`whitespace-nowrap rounded-lg px-3 py-2 text-xs font-bold transition ${activeSection === "profile" ? "bg-[#2563eb] text-white" : "bg-white text-[#52617a] border border-[#dce5f3]"}`}
        >
          Profile
        </button>
        <button
          type="button"
          onClick={() => setActiveSection("addresses")}
          className={`whitespace-nowrap rounded-lg px-3 py-2 text-xs font-bold transition ${activeSection === "addresses" ? "bg-[#2563eb] text-white" : "bg-white text-[#52617a] border border-[#dce5f3]"}`}
        >
          Addresses
        </button>
        <button
          type="button"
          onClick={() => setActiveSection("settings")}
          className={`whitespace-nowrap rounded-lg px-3 py-2 text-xs font-bold transition ${activeSection === "settings" ? "bg-[#2563eb] text-white" : "bg-white text-[#52617a] border border-[#dce5f3]"}`}
        >
          Settings
        </button>
      </div>

      <div className="grid grid-cols-[220px_minmax(0,1fr)] gap-5 max-[760px]:grid-cols-1">
        <aside className="grid h-fit gap-1 rounded-xl border border-[#e4eaf3] bg-white p-3 shadow-[0_4px_16px_rgba(16,36,73,.03)] max-[760px]:hidden">
          <div className="mb-2 grid justify-items-center border-b border-[#edf0f5] px-3 pb-4 pt-1">
            <div className="mb-2 grid size-12 place-items-center rounded-full bg-[#eff4ff] text-[#2563eb]">
              <UserRound size={22} />
            </div>
            <b className="text-xs font-bold text-[#17233b]">{user.name}</b>
            <small className="mt-0.5 max-w-full truncate text-[10px] text-[#8491a5]">
              {user.email}
            </small>
          </div>
          <a
            href="#profile-information"
            className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-[11px] font-semibold transition ${
              activeSection === "profile"
                ? "bg-[#eaf1ff] text-[#2563eb]"
                : "text-[#52617a] hover:bg-[#f4f7fc]"
            }`}
            onClick={selectSection("profile")}
          >
            <UserRound size={15} /> Profile information
          </a>
          <Link
            className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-[11px] font-semibold text-[#52617a] hover:bg-[#f4f7fc]"
            to="/orders"
          >
            <Package size={15} /> My orders
          </Link>
          <Link
            className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-[11px] font-semibold text-[#52617a] hover:bg-[#f4f7fc]"
            to="/wishlist"
          >
            <Heart size={15} /> Wishlist
          </Link>
          <a
            href="#saved-addresses"
            className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-[11px] font-semibold transition ${
              activeSection === "addresses"
                ? "bg-[#eaf1ff] text-[#2563eb]"
                : "text-[#52617a] hover:bg-[#f4f7fc]"
            }`}
            onClick={selectSection("addresses")}
          >
            <MapPin size={15} /> Saved addresses
          </a>
          <a
            href="#account-settings"
            className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-[11px] font-semibold transition ${
              activeSection === "settings"
                ? "bg-[#eaf1ff] text-[#2563eb]"
                : "text-[#52617a] hover:bg-[#f4f7fc]"
            }`}
            onClick={selectSection("settings")}
          >
            <Settings size={15} /> Password & Security
          </a>
          <button
            type="button"
            className="mt-2 flex items-center gap-2 rounded-lg border-t border-[#edf0f5] px-3 pt-3 text-left text-[11px] font-semibold text-[#d14343] transition hover:bg-[#fff1f1]"
            onClick={signOut}
          >
            <LogOut size={15} /> Sign out
          </button>
        </aside>

        <section className="min-w-0" aria-live="polite">
          {activeSection === "profile" && (
            <ProfileInfo user={user} onSave={updateProfile} />
          )}
          {activeSection === "addresses" && (
            <div id="saved-addresses">
              <AddressBook />
            </div>
          )}
          {activeSection === "settings" && (
            user.role === "admin" ? (
              <section
                id="account-settings"
                className="grid gap-2 rounded-xl border border-[#e4eaf3] bg-white p-5 shadow-[0_8px_24px_rgba(16,36,73,.04)]"
              >
                <h2 className="text-lg font-bold text-[#17233b]">
                  Security settings
                </h2>
                <p className="text-xs leading-5 text-[#71809a]" role="status">
                  The local admin preview has no password account to update. Password changes are unavailable for this demo session.
                </p>
              </section>
            ) : (
              <div id="account-settings">
                <AccountSettings />
              </div>
            )
          )}
        </section>
      </div>
    </Container>
  );
}
