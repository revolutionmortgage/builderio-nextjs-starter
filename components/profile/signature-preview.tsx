"use client";

import { useLayoutEffect, useRef, useState } from "react";
import {
  CORP_NMLS,
  CORP_VANITY,
  isLicensed,
  type DetailKey,
  type Details,
  type Person,
} from "@/lib/profile-data";

const TEAL = "#2CCCD3";
const SIG_WIDTH = 700;
const IMG = {
  logo: "https://app.xink.io/Images/Get/E87411/b7.png",
  linkedin: "https://i.xink.io/Images/Get/E87411/l.png",
  facebook: "https://i.xink.io/Images/Get/E87411/f.png",
  instagram: "https://i.xink.io/Images/Get/E87411/i9.png",
  companyBadge: "https://i.xink.io/Images/Get/E87411/c5.png",
};

type Props = {
  person: Person;
  details: Details;
  show: Record<DetailKey, boolean>;
  showPhoto: boolean;
};

function Phone({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <>
      <span style={{ whiteSpace: "nowrap" }}>
        <span style={{ fontWeight: 700, color: TEAL }}>{label}</span>&nbsp;{value}
      </span>
      &nbsp;&nbsp;{" "}
    </>
  );
}

function Pill({ href, bg, size, padding, children }: { href: string; bg: string; size: number; padding: string; children: string }) {
  return (
    <>
      <div style={{ height: 8, lineHeight: "8px", fontSize: 1 }}>&nbsp;</div>
      <div>
        <a
          href={href}
          onClick={(e) => e.preventDefault()}
          style={{
            backgroundColor: bg,
            color: "#FFFFFF",
            fontWeight: 700,
            fontSize: size,
            textDecoration: "none",
            padding,
            borderRadius: 16,
            display: "inline-block",
            fontFamily: "Arial,sans-serif",
            whiteSpace: "nowrap",
          }}
        >
          {children}
        </a>
      </div>
    </>
  );
}

export function SignaturePreview({ person, details, show, showPhoto }: Props) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState<number | undefined>();

  useLayoutEffect(() => {
    const el = outer.current;
    const content = inner.current;
    if (!el || !content) return;
    const measure = () => {
      const s = Math.min(1, el.clientWidth / SIG_WIDTH);
      setScale(s);
      setHeight(content.offsetHeight * s);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    ro.observe(content);
    return () => ro.disconnect();
  }, []);

  const licensed = isLicensed(person);
  const hasPersonalData = licensed || person.inYext;
  const v = (k: DetailKey) => (show[k] ? details[k].trim() : "");
  const vanity = hasPersonalData ? details.vanity.trim() || CORP_VANITY : CORP_VANITY;
  const a = person.address;
  const initials = person.name.split(" ").map((x) => x[0]).join("");
  const socials = [
    { key: "linkedin", src: IMG.linkedin },
    { key: "facebook", src: IMG.facebook },
    { key: "instagram", src: IMG.instagram },
  ].filter((s) => v(s.key as DetailKey));

  const apply = hasPersonalData ? v("applyNow") : "";
  const dpr = licensed ? v("dprLink") : "";
  const states = hasPersonalData ? v("states") : "";
  const team = v("teamName");

  return (
    <div ref={outer} className="w-full overflow-hidden" style={{ height }}>
      <div ref={inner} style={{ width: SIG_WIDTH, transform: `scale(${scale})`, transformOrigin: "top left" }}>
        <div style={{ background: "#fff", color: "#0B0B0B", fontFamily: "Arial,Helvetica,sans-serif", fontSize: 13, padding: "4px 0 8px" }}>
          <br />
          Thanks,
          <table
            cellPadding={0}
            cellSpacing={0}
            style={{ width: SIG_WIDTH, fontFamily: "Arial,Helvetica,sans-serif", backgroundColor: "#F7F7F7", borderTop: `3px solid ${TEAL}`, borderCollapse: "separate", marginTop: 6 }}
          >
            <tbody>
              <tr>
                <td
                  style={{
                    backgroundColor: showPhoto ? "#F7F7F7" : TEAL,
                    width: showPhoto ? 126 : 5,
                    verticalAlign: "middle",
                    padding: showPhoto ? "10px 0 10px 12px" : 0,
                  }}
                >
                  {showPhoto && (
                    <div style={{ width: 110, height: 110, background: "#99AAAA", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, fontWeight: 700 }}>
                      {initials}
                    </div>
                  )}
                </td>
                <td style={{ backgroundColor: "#F7F7F7", width: 404, verticalAlign: "middle", padding: "10px 8px 10px 14px" }}>
                  <table cellPadding={0} cellSpacing={0}>
                    <tbody>
                      <tr>
                        <td style={{ borderBottom: `2px solid ${TEAL}`, paddingBottom: 2 }}>
                          <span style={{ color: "#0B0B0B", fontWeight: 700, fontSize: 20 }}>{person.name}</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div style={{ marginTop: 5, fontSize: 11 }}>
                    <span style={{ color: "#0B0B0B", fontWeight: 700, textTransform: "uppercase" }}>{person.title}</span>
                    {person.nmls !== CORP_NMLS && (
                      <>
                        <span style={{ color: "#666666" }}>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                        <span style={{ fontWeight: 700, color: TEAL }}>NMLS#</span> <span>{person.nmls}</span>
                      </>
                    )}
                  </div>
                  {team && <div style={{ fontSize: 11, color: "#666666", marginTop: 1 }}>{team}</div>}
                  <div style={{ marginTop: 6, fontSize: 12, color: "#0B0B0B", lineHeight: "19px" }}>
                    <Phone label="C" value={v("cell")} />
                    <Phone label="O" value={v("officePhone")} />
                    <Phone label="F" value={v("fax")} />
                    <br />
                    <span style={{ fontWeight: 700, color: TEAL }}>E</span>&nbsp;
                    <span>{person.email}</span>
                    {vanity && (
                      <>
                        &nbsp;&nbsp;&nbsp;
                        <br />
                        <span style={{ fontWeight: 700, color: TEAL }}>W</span>&nbsp;
                        <span>{vanity.replace(/^https?:\/\//i, "")}</span>
                      </>
                    )}
                  </div>
                  {a.street && (
                    <div style={{ marginTop: 3, fontSize: 11, color: "#0B0B0B", lineHeight: "15px" }}>
                      {a.street}, {a.city}, {a.state} {a.zip}
                    </div>
                  )}
                  {socials.length > 0 && (
                    <table cellPadding={0} cellSpacing={0} style={{ marginTop: 4 }}>
                      <tbody>
                        <tr>
                          {socials.map((s) => (
                            <td key={s.key} style={{ padding: 0, width: 28 }}>
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={s.src} alt={s.key} width={22} style={{ display: "block" }} />
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  )}
                </td>
                <td style={{ backgroundColor: "#F7F7F7", verticalAlign: "middle", textAlign: "center", padding: "10px 14px 10px 8px", width: 170 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={IMG.logo} alt="Revolution Mortgage" width={128} style={{ display: "block", margin: "0 auto" }} />
                  {apply && (
                    <Pill href={apply} bg={TEAL} size={11} padding="8px 18px">
                      APPLY NOW
                    </Pill>
                  )}
                  {dpr && (
                    <Pill href={dpr} bg="#F5A524" size={10} padding="8px 14px">
                      DOWN PAYMENT RESOURCE
                    </Pill>
                  )}
                </td>
              </tr>
              <tr>
                <td colSpan={3} style={{ backgroundColor: "#EAEAEA", padding: "8px 20px 8px 14px" }}>
                  <table cellPadding={0} cellSpacing={0} width="100%">
                    <tbody>
                      <tr>
                        <td style={{ fontSize: 10, lineHeight: "13px", verticalAlign: "middle" }}>
                          {states && <span style={{ color: "#666666" }}>Licensed in: {states}</span>}
                        </td>
                        <td style={{ textAlign: "right", verticalAlign: "middle", width: 330 }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={IMG.companyBadge} alt="Company NMLS# 1686046" width={124} style={{ display: "block", margin: "0 0 0 auto" }} />
                          <div style={{ fontSize: 8, color: "#666666", lineHeight: "11px", marginTop: 2 }}>
                            T2 Financial, LLC. dba Revolution Mortgage is an Equal Housing Lender.
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
