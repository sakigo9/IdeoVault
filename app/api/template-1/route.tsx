import { ImageResponse } from 'next/og'

// http://localhost:3000/api/template-1?company=Microsoft&salary=$150&designation=Frontend%20Engineer&location=Remote%20India

export const runtime = 'edge'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const fontSemiBold = await fetch(
    new URL('./Poppins-SemiBold.ttf', import.meta.url),
  ).then((res) => res.arrayBuffer())
  const fontRegular = await fetch(
    new URL('./Poppins-Regular.ttf', import.meta.url),
  ).then((res) => res.arrayBuffer())
  const fontBold = await fetch(
    new URL('./Poppins-Bold.ttf', import.meta.url),
  ).then((res) => res.arrayBuffer())

  const companyName = searchParams.get('company')
  const location = searchParams.get('location')
  const designation = searchParams.get('designation')
  const salary = searchParams.get('salary')
  const skillSet = ['ReactJS', 'Javascript', 'HTML', 'CSS']
  const icon = searchParams.get('icon')
  const backgroundImage =
    'https://files.edgestore.dev/e4ruvfungse4xfxp/publicFiles/_public/07cd90c3-af65-4b6a-b7db-2d5119b13f3d.png'

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          position: 'relative',
          fontSize: '42px',
          backgroundImage: `url(${backgroundImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          height: '100vh',
          width: '628px',
        }}
      >
        <div
          style={{
            width: '200px',
            height: '200px',
            backgroundColor: '#14dbc7',
            borderRadius: '50%',
            display: 'flex',
            fontSize: '28px',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: 'PoppinsSemiBold',
          }}
        >
          {icon ? (
            <svg
              fill='#000000'
              version='1.1'
              id='Capa_1'
              xmlns='http://www.w3.org/2000/svg'
              width='120px'
              height='120px'
              viewBox='0 0 935.996 935.996'
            >
              <g>
                <g>
                  <g>
                    <path
                      d='M76.416,653.994c-0.738-0.698-1.469-1.405-2.191-2.129c-20.776-20.774-32.218-48.399-32.218-77.781V91.273
				c0-10.925,2.949-21.168,8.072-30H30c-16.569,0-30,13.431-30,30v482.81C0,617.066,33.898,652.119,76.416,653.994z'
                    />
                    <path
                      d='M466.439,167.209c-37.812,0-62.039,32.671-62.039,86.268c0,53.963,24.229,88.47,62.039,88.47
				c37.809,0,62.04-34.507,62.04-88.47C528.479,199.88,504.25,167.209,466.439,167.209z'
                    />
                    <path
                      d='M663.203,326.476c16.695,3.021,33.004,7.845,48.791,14.442c27.19-2.972,42.25-16.047,42.25-39.72
				c0-24.962-19.09-36.71-55.064-36.71h-35.977V326.476L663.203,326.476z'
                    />
                    <path
                      d='M741.396,198.779c0-22.026-15.785-31.203-46.988-31.203h-31.203v66.444h30.469
				C727.078,234.02,741.396,221.172,741.396,198.779z'
                    />
                    <path
                      d='M152.007,654.083h251.63c-0.354-0.809-0.718-1.612-1.063-2.43c-11.71-27.686-17.939-56.992-18.56-87.18H185.73
				c-8.284,0-15-6.717-15-15c0-8.285,6.716-15,15-15h199.533c2.204-21.082,7.203-41.642,14.963-61.41H185.73
				c-8.284,0-15-6.715-15-15s6.716-15,15-15H414.5c10.515-18.622,23.498-35.718,38.81-51.03c4.551-4.551,9.269-8.885,14.128-13.022
				c-0.334,0.003-0.665,0.012-1,0.012c-62.406,0-105.725-47.724-105.725-125.547c0-77.458,43.317-123.344,105.725-123.344
				c62.772,0,106.09,45.887,106.09,123.344c0,31.861-7.265,58.673-20.148,79.234c22.021-6.643,44.877-10.018,68.24-10.029V134.537
				h76.723c49.56,0,85.9,15.051,85.9,59.102c0,22.76-13.215,44.786-41.115,52.128v1.468c34.506,5.874,53.596,24.596,53.596,56.899
				c0,30.077-15.364,50.103-39.809,60.885c11.469,7.987,22.254,16.999,32.271,27.015c19.976,19.975,35.996,42.984,47.722,68.465
				c1.033,2.248,2.047,4.508,3.014,6.793c12.355,29.213,18.621,60.227,18.621,92.182c0,31.953-6.266,62.967-18.621,92.18
				c-0.25,0.588-0.514,1.168-0.768,1.754c39.344-5.031,69.76-38.612,69.76-79.324V91.273c0-16.569-13.43-30-30-30h-72.004H102.007
				c-16.568,0-30,13.431-30,30v482.811C72.007,618.267,107.825,654.083,152.007,654.083z M199.561,316.617
				c9.545,17.621,22.76,25.33,37.444,25.33c22.393,0,33.773-12.114,33.773-46.254V134.537h42.583v164.826
				c0,43.685-21.292,79.66-71.583,79.66c-33.406,0-56.533-13.95-71.584-40.747L199.561,316.617z'
                    />
                    <path
                      d='M788.188,726.914c-11.772,11.773-24.606,22.164-38.37,31.125l102.289,102.289c9.596,9.597,22.172,14.396,34.747,14.396
				c12.578,0,25.152-4.799,34.75-14.396c19.189-19.188,19.189-50.305,0-69.496L819.312,688.541
				C810.354,702.306,799.961,715.14,788.188,726.914z'
                    />
                    <path
                      d='M432.832,473.064c-8.789,19.082-14.756,39.729-17.369,61.41c-0.987,8.195-1.509,16.535-1.509,25
				c0,1.672,0.024,3.338,0.063,5c0.765,32.236,8.908,62.646,22.806,89.608c2.644,5.132,5.504,10.132,8.554,15
				c3.23,5.156,6.677,10.162,10.335,15c37.751,49.923,97.623,82.187,165.037,82.187c39.293,0,76.025-10.961,107.311-29.988
				c22.388-13.617,41.978-31.373,57.726-52.197c3.66-4.838,7.104-9.844,10.336-15c0.479-0.766,0.965-1.526,1.436-2.301
				c2.519-4.139,4.892-8.377,7.117-12.699c4.596-8.911,8.559-18.2,11.836-27.807c7.15-20.957,11.035-43.426,11.035-66.803
				c0-81.051-46.635-151.197-114.527-185.105c-27.776-13.873-59.106-21.69-92.268-21.69c-0.043,0-0.086,0.002-0.129,0.002
				c-70.984,0.043-133.594,35.854-170.801,90.383C443.36,452.53,437.669,462.561,432.832,473.064z'
                    />
                  </g>
                </g>
              </g>
            </svg>
          ) : (
            <svg
              fill='#000000'
              version='1.1'
              id='Capa_1'
              xmlns='http://www.w3.org/2000/svg'
              width='120px'
              height='120px'
              viewBox='0 0 76.161 76.161'
            >
              <g>
                <path
                  d='M62.943,20.161H13.216v-7.393h49.728V20.161z M13.216,46.369h19.712V26.657H13.216V46.369z M13.216,57.792h26.88
		c-0.673-0.672-1.345-1.567-1.792-2.464H13.216V57.792z M13.216,51.969h23.52c-0.224-0.896-0.672-1.566-0.896-2.465H13.216V51.969z
		 M41.664,29.121c0.896-0.896,2.016-1.792,3.137-2.464h-6.497v2.464H41.664z M13.216,63.393h34.72
		c-1.567-0.672-2.912-1.567-4.479-2.465h-30.24V63.393z M75.936,49.504c-0.672,2.912-2.016,5.377-3.584,7.616l3.81,6.72V48.833
		C76.16,49.057,76.16,49.281,75.936,49.504z M63.393,72.801l-0.449-1.121H8.96c-2.464,0-4.48-2.016-4.48-4.479V8.96
		c0-2.464,2.016-4.479,4.48-4.479H67.2c2.464,0,4.479,2.017,4.479,4.479v21.728c0.896,0.896,1.566,2.019,2.238,3.139
		c1.12,1.792,1.792,3.584,2.24,5.603V8.96C76.16,4.033,72.128,0,67.2,0H8.96C4.032,0,0,4.033,0,8.96v58.24
		c0,4.928,4.032,8.96,8.96,8.96h56.448l-0.225-0.448L63.393,72.801z M40.768,52.865c-4.705-8.288-1.791-19.04,6.496-23.744
		c8.289-4.704,19.041-1.792,23.743,6.496c4.929,8.288,2.017,19.04-6.271,23.743C56.225,64.289,45.695,61.376,40.768,52.865z
		 M63.168,56.897c6.943-4.033,9.409-12.994,5.376-19.938c-4.032-6.942-12.991-9.405-19.937-5.376
		c-6.943,4.034-9.407,12.994-5.375,19.938C47.264,58.465,56.225,60.928,63.168,56.897z M68.993,58.079l-7.565,4.367l5.822,10.088
		l7.566-4.366L68.993,58.079z M68.096,73.92c1.121,2.016,3.811,2.688,5.824,1.568c2.016-1.12,2.688-3.809,1.568-5.824L68.096,73.92z
		'
                />
              </g>
            </svg>
          )}
        </div>
        {companyName && (
          <p style={{ fontSize: '48px', fontFamily: 'PoppinsBold' }}>
            {companyName}
          </p>
        )}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {designation && (
            <p style={{ fontSize: '28px', fontFamily: 'PoppinsSemiBold' }}>
              💻 Designation : {designation}
            </p>
          )}
          {skillSet.length > 0 && (
            <p
              style={{
                fontSize: '28px',
                fontFamily: 'PoppinsSemiBold',
                marginBottom: '-10px',
              }}
            >
              🎯 Skill Set
            </p>
          )}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '7px',
              padding: '20px',
            }}
          >
            {' '}
            {skillSet &&
              skillSet.map((item, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      borderRadius: '25px',
                      fontSize: '20px',
                      fontFamily: 'PoppinsRegular',
                      padding: '10px',
                      color: '#000',
                      background: '#fff',
                    }}
                  >
                    {item}
                  </div>
                )
              })}
          </div>
          {salary && (
            <p style={{ fontSize: '28px', fontFamily: 'PoppinsSemiBold' }}>
              💰 Salary : {salary}
            </p>
          )}
          {location && (
            <p style={{ fontSize: '28px', fontFamily: 'PoppinsSemiBold' }}>
              📍Location : {location}
            </p>
          )}
        </div>
        <div
          style={{
            fontSize: '30px',
            fontFamily: 'PoppinsSemiBold',
            color: '#14dbc7',
            display: 'flex',
            textAlign: 'center',
          }}
        >
          {"Retweet, Follow and comment 'Pragmatic' to get the link!"}
        </div>
        <div
          style={{
            padding: '25px',
            fontSize: '20px',
            fontFamily: 'PoppinsSemiBold',
          }}
        >
          DM for Mentorship and Career Guidance.
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '0px',
            left: '20px',
            fontFamily: 'PoppinsSemiBold',
            display: 'flex',
            justifyContent: 'space-between',
            width: '600px',
            alignItems: 'center',
          }}
        >
          <p style={{ fontSize: '28px' }}>Pragmatic Dev</p>
          <p style={{ fontSize: '20px' }}>⚡️Never Stop Coding!</p>
        </div>
      </div>
    ),
    {
      width: 628,
      height: 1200,
      emoji: 'twemoji',
      fonts: [
        {
          name: 'PoppinsSemiBold',
          data: fontSemiBold,
          style: 'normal',
        },
        {
          name: 'PoppinsRegular',
          data: fontRegular,
          style: 'normal',
        },
        {
          name: 'PoppinsBold',
          data: fontBold,
          style: 'normal',
        },
      ],
    },
  )
}
