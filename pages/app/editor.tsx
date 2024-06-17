/* eslint-disable @next/next/no-img-element */
import { RootState } from "@/redux/store";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Loading = () => (
  <>
    <div className="flex flex-col gap-4 justify-center items-center h-screen w-screen">
      <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
      <div className="  ">Loading cropper</div>
      <div className="text-xs text-gray-500">
        This only takes longer the first time
      </div>
    </div>
  </>
);

const OFFLINE_ICON =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgo8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0idXJsKCNwYXR0ZXJuMF80ODNfNikiLz4KPGRlZnM+CjxwYXR0ZXJuIGlkPSJwYXR0ZXJuMF80ODNfNiIgcGF0dGVybkNvbnRlbnRVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giIHdpZHRoPSIxIiBoZWlnaHQ9IjEiPgo8dXNlIHhsaW5rOmhyZWY9IiNpbWFnZTBfNDgzXzYiIHRyYW5zZm9ybT0ic2NhbGUoMC4wMSkiLz4KPC9wYXR0ZXJuPgo8aW1hZ2UgaWQ9ImltYWdlMF80ODNfNiIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIHhsaW5rOmhyZWY9ImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBR1FBQUFCa0NBWUFBQUJ3NHBWVUFBQUFDWEJJV1hNQUFBc1RBQUFMRXdFQW1wd1lBQUFLRlVsRVFWUjRuTzJkQzVCWFZSM0hQN3ZzRW1CQW9tWnFRbEpwRDh4Sm9nSXJuMk9TbFZUaVFtL3NKVm5aZ1BTYU5LMThWeFpaVVRHVlZsUVc0VVRXT0ViMnRNZFlUcWJaUTFCQVZKSkFXQk1XMk4zbTUzeHY4L2Q2enIzMzNQLzlQM2IzZkdmT0RPemV4em5uZSs3di9IN2Y4enRuSVNJaUlpSWlJaUlpSWlJaW92MXdPdkFnY0I4d3A5V1ZHZW5vQUxZQWd5cDdnSjVXVjJxa1kzTU5JUWtwODFwZHFaR00xNHFFU0VxYnpTTnBVdllDYjJ4MXhVWXlJaWx0aUI3UGw5S0lPZVdKd0F6Z0RPQ0R3SmVBNjREZkFIY0Mvd2EyQXYrdHFjdE8vV3l6cnJGcmZ3UjhFZmdRTUYvUDNJZGhoRWFRTWdaNHFUcnQrOEMvZ1A3VU82b3NBOEJhRWZ3UjRIaGdQTU9RRkJ1QlJkM3BGd0RuQWI4RitoclkrWU1GaTdYblp1QkM0QmhnRk1PY2xFN2dPR0FaOEVBYkVEQ1lVOHdrZmdVNEJlaG1HSkZ5QlBCcFJmb2hIZEl2MDJWbTViUEErK1dDbTJsN0xuQVFzQzh3VHUvcDF2K25BTThDcGdNbkFITmxDcjhLM0FSc2tNa0txWXZOU1o4QmptUUlrL0pKZFVEUnhtOEJWcW5qYmVJZDI4QTZqNUhKUEVkelZzaGcrWjBHWFBkUUl5V3ZQS3pPT0J1WXBubWxsWGc2OEdiZ08wQnZnZnJmSis5di9GQW1wVTl1Nk92YjNQVWNDN3dPK0s0R1RsYWIvaVBuWkNKRGlKVDF3RHVBU1F3OWpGTXNkRk1PTWFhSXY2ZVZwdXpsd0ZUSHo4L3dhRi9EUVNWK1BuQjFqcHYrVCtEVVpsYnFJSDNLeWNnL2JJU1JZbmdLOEluVTBrUzYvQkE0bEFiQ0p0MkZ3RU1PY3pRU1NURThDYmdjMk9VaHBWZDkxdEdJRWZHVGpIamgvSUE1SllTVWJzVVRQZkpvVEpPNkhyaFYwc2NtYVZmbVp1L1d2KytSam5VTGNJTUMwU1dLWVk1cWtEUHhOR0JGaG90djlYaHFWUzk3bGFKVzE0ditJSDgrQ3lHa1RBWVdBRi9RczMwanI1NWlBK2cydmVNTkNpU3J3Z3dKbXE3MzJtQTVyWjZIbTVaelJjYW5lSmJra0NLWXAxR2NKc1U2NUZqZ01uWFNZSXVLUmU5WHFTNUYyK1NEM2I4SWVNVHhuZ0dwRnNHZTJIN0FqWjdLLzhJelo1UWhwUjNML1RYazFHUDdudzM4MGZPT1h3RUhGSDJRNlRYckhBOHhHMzF1blNOb2ZnbFM3bEV3ZWFuOC9GZkxURTdWd05sWEhaZG9XV2JQbjZOclRwVThjcFhzK05yQTk5K3UrS21zak5PbG9IRzM0OW5ycEZCazRtWEFOc2ZORzRGWlZJTjVHUkY5bjBiUEJWcWptTmlnaFMrTG9TNENmbDFRK2pmMzltTGdrSkx2ZktFY2tQUnpkd0FuK1c1NmpWYmMwamVaNmRxL1JDVW1xUkZUQXlMNkJUUWZZeVd4ZndQWW5rUE1UczEzNXU2RzRtQ1BDZHNsUmZveGVMdm5VLzZ5UHJ0UUpYV0p2SW9rVGhrcUVmMFlhVmdyY3p5OExUS0ZvMHVRdjhMeFBPdjdkeVlYdmRmaFAvZXJVME54c3V4MCtvVkRpWlRhMk9zU2p3bFBpcTNYekNZTU50OTkyTEZFUFNDU0gyMzhYc2VuYWF0N1JXRW03WnFNaWorUTBjbnRUQXFTMXhmSk5mYTF6eGEvSmxBY3h6cmM0c2ZrSmJ6VndaakZHak1MUEh5Mkk3c3hLZHVVUkpBWEhkY2IwVGNEbytWbGJzL3dCbTJGTWc4ek5abW52NDdIelo4TEhhYkxPdlRvakFwK3lpTVg5Q3NTTmplMEh1OXJUNXVSa3BpeXIzbXlZcXd2cnN3SS9JNTJtRUM3NTkyK2x5MzI2UHhwZi9tUWpLRG45anBjNUhtZWlQNHNKZXJaMnZoeUJhZC9sUysvVlg1K29tWGREZHloYkJZem94L1ZjNmVYbUlUelpKSmJQSDN3YzhWSXRaaW12a3hmYTE5ZEpzN3pSSytINi9mV3NIc2QxMWpIZmF5Q1JzOXZZRVJ2U1hWclZNL2pLcWpyYUxuQnJxOWxiYzFBUGx4OW1MN0dKOG8rRHBjNGJ0Nmc5ZS9hVE1HazNLdWdraVlFajRNVmxxMmFrRStvVTRFNE1TUHdXNmpBT3YwN1V4NkM4TG1DamJvaFJKZHgyT01MQTRQSHdRYVZUWXJlRHl6WkZ2TTBmMXp3WFV2THZLQkRveWZyd1plWEhGbEhLQWx0VjA2YzB1TWhaWm5Nd1pOcjVKVXVPUkdUWlNKT1ZMQjFxUUk5MXdoMmxaMEtpQk1USGFxUWZ6N24rY3ZyRVMydHM3L2xlR2kvQXNwUW1EUHdUWS9OWFI4WVBOclBRekZGR1MvTFBSTnN1bzFYUy9JSXhXSlBHNzlkZ2J6LzZNaGJtUnBCSmkrRTRBbUtUclB5blhZcXVhNVp3V09YaEwxbE9ScFdyN3c3YTBNSVRrOXBneXRMeUZDWjNzVDFxbHhJQkk4bSs3dHlzalFXTzl6RVpnYVA0eVh0L3oyam5uY3BqVFcwN1R2VWQxVzYzUDhYeG14TnVpaTZsSm5oYzJITkxYeFQ0Q2ZjMCtEdGRSMVN2ZS8wMU5uYTh2SEFrZjY4QnFmRkZzSmh5b0YxTmVwK0JYcGxFOHJtTldIUFk1Y1dwbnlPd00wbFYwMWJnaGRuSkVWY1c4QTBGY0hjSnUxNW5DRDN2OStUUWhwcXdwcU91WjVGcm5WWksyTVZSdlI3QXpZTmhlQWtTVEl1UjhRbTc3YkVJczlJV2wxeWhTMk43Z0JTL3F6TXdTdms1ajZUK2pGUmJYRzV4OWIydHNKRmpvb09LQW92NjNlUGtwZHltUVJMWDV4U1ZQdmFwUGhqVGdrWE5rR24ydVJTdUgwdWU5T3h2MGVyc1JGYUJnZkxPM090c2RSTFN1MFM3RktsNnBUQmRSNnRyNHI1c1JMNDFFeFRqa1Bjd3hVRnNrQ3FJaVV4TjZza3BSZkYrUjdQc1FxeldDbW1lYkxCTGVqTHduN2FnNzQzcC9PU0ZLR2xHZXZZWmFYN0FVbEVlZm0zNXpydWZWQjdIdHNTMHgzWjhiNFZzUTdKK1VsMnlxQ2piTlBxM095QUpHa2ZLVCtRR1hWNWdVbDVXSFZ5aVg5bkI2Nm90ZzFtT2pTcjlKcnhKSS9ITXFoeXEvYjdsWjE4WGFRa2dxVEZGbStUWk9ONy81cVVxSGltZzR5aU9RZHRnZU05V1JYV1VTOVNRb0NySTI0RFhsbFJIYkpJU2J3NFMvYitXOGFtem1NOHozbWtoS2JYY3B6aW1LRDNlQ2J0N1ZwWjY2eTREbm1rSk1RczhXU3I5emtVZ1YxS1JSMlNtRk5nMWU5blZXNW1LVWtLOHBKK21WUFgzY1BobUVQZkpOdXZJS3NaWjRyTUwwaEtaOGFlbUVhZGV0UVN2Q1VscS9RMVNITXFJMGphUEpMR21ha3RCQU5TZjRjVkVyZXhWK3ZkWmJjU3ZFSlo5YXUxb0pUT3k3cERrYlNkekZEMlMwa0V4VjdWMmVvK0xQRytFa2wwSFpwRXYrZVplSDFsUXdXa3pGS2RJd1NiUVA4U1FJS0xsS0l5UzluRWlSR0JLY3IzS2t0RUVWSjhhYXVSRk1ma3V5Mm5nNjlSNUQ5RGVWampWQ2JyWnd0MHpjWWNRVEtTa29Oek1yTHBiOVNlK2RBa3M1ZG82Zmh1ejV3UzRuMk5HSFJvcCt5Z28veStvcFBjamhReDhVc3BnSGQ1eUxpZzRzQnhsR0lNVjhaSU5GK3A5ZkxWbm5RYml6MnF3ampKSXo2WE9KcXZHb3oySEhDenBxSkVNM3YrVHd2RUtaR1VHdXlqemZ4cFV1cE54VXhTWWRQUHRmTVZDVEJmN2JhOXJpbVlvSk9BMHAyM3FtU3k4cWlhQTlmU2kyQlpleURqbDFJRHkrUDZrNk1UcncyYzVEdTEvY0cxRUZZa1F5U1NVb01ESkJTbU8vUHJCUmV5T3JUVklIMy9QN1J6cXlnaUtUVTQwTE5Gd0hZcDVjRzFyckZlMFh3b0lpazFPTlNUVjJ0SGYvdHdzZVA2alhWbXJFZFNhdkFNejlZQTI0TmVaRnYzWnAwSFh5OGlLYW1Ob3E2L3F2Q0JsQmJXNkVTMlNFb05qdEsrREZjaW5pdDM2aUVsNzFXTlp1MVBHVEliZ25ZNDFPRDBWb2dkdXJaUkdDcG5zelFGczNJT3lXOVdJbHY4VWxKSkNLNDgzVDRsUWpRTDhhL1hwYklqYTQvaTI2MVRTNXVOU0lyakw1RTJhbjloVVVSU1VvbDRWbHFOT05HM0llS1gwb2J3blRoUjEySDhFZFdUWXVKbVJCdVJZbnBjUkl0eG1rNnlXTjhpbHp3aUlpSWlJaUlpSWlJaUlvSXMvQStGYTY4S1NqcUxjUUFBQUFCSlJVNUVya0pnZ2c9PSIvPgo8L2RlZnM+Cjwvc3ZnPgo=";

const Offline = () => (
  <div className="flex flex-col p-2 gap-4 justify-center items-center h-screen w-screen">
    <Image src={OFFLINE_ICON} height={50} width={50} alt="no internet" />
    <div className="text-xl font-bold">You are offline</div>
    <div className="text-md">Please enable internet connection</div>
    <div className="text-xs text-center">
      Unfortunately, the editor requires internet connection to load. Sorry for
      the inconvenience.
    </div>
  </div>
);

const Cropper = dynamic(() => import("../../components/cropper"), {
  ssr: false,
  loading: () => <Loading />,
});

const Editor = () => {
  const [offline, setOffline] = useState(false);
  const img = useSelector((state: RootState) => state.images.editorImage);
  const router = useRouter();
  useEffect(() => {
    if (!img.image) router.push("/app");

    const updateOnlineStatus = () => {
      setOffline(!navigator.onLine);
    };

    if (typeof window !== "undefined") {
      updateOnlineStatus();
      window.addEventListener("online", updateOnlineStatus);
      window.addEventListener("offline", updateOnlineStatus);

      return () => {
        window.removeEventListener("online", updateOnlineStatus);
        window.removeEventListener("offline", updateOnlineStatus);
      };
    }
  }, []);
  return <>{offline ? <Offline /> : <Cropper />}</>;
};

export default Editor;
