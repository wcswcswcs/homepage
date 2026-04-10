import { Title } from '../Common/Title';
import { Member } from './Member';
import { MemberType } from '@/types';
import data from '@/data';

const Faculty: MemberType[] = [];
const PhDs: MemberType[] = [];
const PostDocs_RAs: MemberType[] = [];
const Visitors: MemberType[] = [];
const Alumni: MemberType[] = [];
const Masters: MemberType[] = [];

data.members.forEach(item => {
  switch (item.type) {
    case 'Faculty':
      Faculty.push(item);
      break;
    case 'PhD':
      PhDs.push(item);
      break;
    case 'PostDoc':
      PostDocs_RAs.push(item);
      break;
    case 'RA':
      PostDocs_RAs.push(item);
      break;
    case 'Visitor':
      Visitors.push(item);
      break;
    case 'Alumni':
      Alumni.push(item);
      break;
    case 'Master':
      Masters.push(item);
      break;
  }
});

const ALUMNI_SECTIONS: Array<'Research Staff' | 'Visitors' | 'Graduate'> = [
  'Research Staff',
  'Visitors',
  'Graduate',
];

const getAlumniGroup = (
  member: MemberType,
): 'Research Staff' | 'Visitors' | 'Graduate' => {
  if (member.alumniGroup) {
    return member.alumniGroup;
  }

  const text = `${member.title} ${member.comment}`.toLowerCase();

  if (text.includes('visiting')) {
    return 'Visitors';
  }

  if (text.includes('research fellow') || text.includes('research assistant')) {
    return 'Research Staff';
  }

  return 'Graduate';
};

const normalizeText = (text: string) => text.trim().toLowerCase();
const escapeRegExp = (text: string) =>
  text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const removeDuplicatedInstitution = (text: string, destination?: string) => {
  if (!text || !destination) {
    return text;
  }

  const normalizedDestination = normalizeText(destination);
  const primaryDestination = destination.split('·')[0].trim();
  const normalizedPrimaryDestination = normalizeText(primaryDestination);
  const segments = text
    .split(',')
    .map(segment => segment.trim())
    .filter(Boolean);

  if (segments.length > 1) {
    const lastSegment = segments[segments.length - 1];
    const normalizedLastSegment = normalizeText(lastSegment);
    if (
      normalizedLastSegment === normalizedDestination ||
      normalizedLastSegment === normalizedPrimaryDestination ||
      normalizedDestination.includes(normalizedLastSegment)
    ) {
      return segments.slice(0, -1).join(', ');
    }
  }

  if (normalizeText(text).includes(normalizedPrimaryDestination)) {
    return text
      .replace(new RegExp(escapeRegExp(primaryDestination), 'ig'), '')
      .replace(/\s*,\s*$/, '')
      .trim();
  }

  return text;
};

const hasSameInstitution = (text: string, destination?: string) => {
  if (!text || !destination) {
    return false;
  }

  const primaryDestination = destination.split('·')[0].trim();
  const normalizedPrimaryDestination = normalizeText(primaryDestination);
  const normalizedText = normalizeText(text);

  const textSegments = text
    .split(',')
    .map(segment => segment.trim())
    .filter(Boolean)
    .map(segment => normalizeText(segment));

  return (
    normalizedText.includes(normalizedPrimaryDestination) ||
    textSegments.some(
      segment =>
        segment === normalizedPrimaryDestination ||
        normalizedPrimaryDestination.includes(segment) ||
        segment.includes(normalizedPrimaryDestination),
    )
  );
};

const getAlumniDescription = (member: MemberType) => {
  const role = member.role || member.title || member.comment;
  const destination = member.destination || 'NA';
  const deduplicatedBg = removeDuplicatedInstitution(member.bg, destination);
  const description = [role, deduplicatedBg].filter(Boolean).join(', ');
  const shouldHideDestination = hasSameInstitution(
    [role, member.bg].filter(Boolean).join(', '),
    destination,
  );

  if (!description) {
    return destination;
  }

  return shouldHideDestination
    ? description
    : `${description} → ${destination}`;
};

export const Members = () => {
  return (
    <div
      className="flex flex-col items-center md:justify-start md:items-start max-w-7xl w-full mx-auto p-5 md:p-0"
      id="work"
    >
      <Title title="Faculty" />
      <div className="flex flex-wrap mt-10">
        {Faculty.map((member, i) => (
          <Member key={i} member={member} />
        ))}
      </div>

      <Title title="Research Staff" />
      <div className="flex flex-wrap mt-10">
        {PostDocs_RAs.map((member, i) => (
          <Member key={i} member={member} />
        ))}
      </div>

      <Title title="PhD Students" />
      <div className="flex flex-wrap mt-10">
        {PhDs.map((member, i) => (
          <Member key={i} member={member} />
        ))}
      </div>

      <Title title="Master's Students" />
      <div className="flex flex-wrap mt-10">
        {Masters.map((member, i) => (
          <Member key={i} member={member} />
        ))}
      </div>

      <Title title="Visitors" />
      <div className="flex flex-wrap mt-10">
        {Visitors.map((member, i) => (
          <Member key={i} member={member} />
        ))}
      </div>

      <Title title="Alumni" />
      <div className="mt-10 w-full space-y-10">
        {ALUMNI_SECTIONS.map(section => {
          const items = Alumni.filter(
            member => getAlumniGroup(member) === section,
          );

          if (items.length === 0) {
            return null;
          }

          return (
            <section key={section}>
              <h3 className="text-2xl font-bold text-text">{section}</h3>
              <div className="mt-4 space-y-6">
                {items.map((member, i) => {
                  const description = getAlumniDescription(member);

                  return (
                    <article key={`${section}-${member.name}-${i}`}>
                      {member.homepage ? (
                        <a
                          className="text-2xl font-semibold text-text underline-offset-4 hover:underline"
                          href={member.homepage}
                        >
                          {member.name}
                        </a>
                      ) : (
                        <h4 className="text-2xl font-semibold text-text">
                          {member.name}
                        </h4>
                      )}
                      <p className="mt-2 text-xl leading-relaxed text-textDark">
                        {description}
                        {member.period ? ` · ${member.period}` : ''}
                      </p>
                    </article>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};
