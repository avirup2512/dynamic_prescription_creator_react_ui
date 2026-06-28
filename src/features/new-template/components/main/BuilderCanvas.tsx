import PrescriptionCanvas from "./PrescriptionCanvas/PrescriptionCanvas";

export default function BuilderCanvas({ header, body, footer }: { header: unknown; body: unknown; footer: unknown }) {
    return <PrescriptionCanvas header={header} body={body} footer={footer} />;
}
