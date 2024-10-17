import React from 'react'
import Container from '../container/Container'
import Card from '../card/Card'
import { Loading } from '../../utils'
import { Skeleton } from 'antd'

const Cars = ({ data, title, loading, className, link, slice }) => {

  return (
    <div>
          <Container>
              <div>
                  <div className="flex items-center justify-between">
                      {title && <h2 className="text-3xl font-bold mb-5">{title}</h2>}
                  </div>
                  {loading ? 
                     <div className={`grid ${className}`}>
                        {
                            Array.from({ length: slice }).map((_, index) => (
                                <div className="flex flex-col  gap-2" key={index}>
                                    <div className="flex items-start justify-between">
                                        <div className="flex flex-col items-start gap-2">
                                            <Skeleton.Input active style={{ width: 150, height: 25 }} />
                                            <Skeleton.Button style={{ width: 100, height: 25 }} active />
                                        </div>
                                        <Skeleton.Button active style={{ width: 50, height: 25 }} />
                                    </div>
                                    <Skeleton.Image style={{ width: 280, height: 200 }} active className="my-2" />
                                    <Skeleton.Input active style={{ width: 280, height: 25 }} />
                                    <div className="flex items-center justify-between ">
                                        <Skeleton.Button active style={{ width: 100, height: 25 }} />
                                        <Skeleton.Button active style={{ width: 100, height: 25 }} />
                                    </div>
                                </div>
                            ))
                        }
                     </div>
                   : 
                      <div className={`grid ${className}`}>
                          {data?.payload.slice(0, slice).map((car) => (
                              <Card key={car._id} car={car} loading={loading} />
                          ))}
                      </div>
                  }
              </div>
          </Container>
    </div>
  )
}

export default Cars
